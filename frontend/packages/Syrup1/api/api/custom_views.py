from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.serializers import Serializer
from auditlog.models import LogEntry
from authorization.models import User
from api.utils import create_log_entry, return_changes
from django.shortcuts import get_object_or_404
from django.http import HttpRequest
from django.db.models import ImageField
from django.db.models import ForeignKey, ManyToManyField, Model

import re

from typing import Dict, Any, List, Type, Optional


class SyView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    """
    A custom view that combines list, create, retrieve, update, and destroy operations.
    """

    serializer_class: Type[Serializer] = None
    model_class: Type[Model] = None
    foreign_key_fields: List[str] = []
    mtm_fields: Dict[str, str] = {}
    mtm_values: Dict[str, List[Any]] = {}

    def get_queryset(self):
        return self.model_class.objects.all()

    def perform_create(self, serializer):
        return serializer.save()

    def get_object(self):
        pk = self.kwargs.get("pk")
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, *args, **kwargs) -> Response:
        """
        Handle GET requests.

        Args:
            request (Request): The request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response.
        """

        if "pk" in kwargs:
            return self.retrieve(request, *args, **kwargs)
        else:
            return self.list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs) -> Response:
        """
        Handle POST requests for object creation.

        Args:
            request (Request): The request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response.
        """

        data = request.data.copy()
        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        if self.foreign_key_fields:
            self.process_foreign_key_fields(data)

        if self.mtm_fields:
            self.process_many_to_many_fields(data, model_fields)

        if any(field.name == "author" for field in model_fields):
            self.process_author_field(request, data)

        serializer = self.model_class.serializer_class(data=data)

        serializer.is_valid()
        print(serializer.errors)

        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        if self.mtm_values:
            for field in self.mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(self.mtm_values[field])

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def update(self, request, *args, **kwargs) -> Response:
        """
        Handle PUT requests for object update.

        Args:
            request (Request): The request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response.
        """

        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        model_fields = self.serializer_class.Meta.model._meta.get_fields()
        data = self.check_data_for_images(instance, request)

        if self.mtm_fields:
            self.process_many_to_many_fields(data, model_fields)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if self.mtm_values:
            for field in self.mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(self.mtm_values[field])

        changes = return_changes(instance, old_instance)

        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs) -> Response:
        """
        Handle DELETE requests for object deletion.

        Args:
            request (Request): The request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response.
        """

        instance = self.get_object()
        if hasattr(instance, "image") and instance.image is not None:
            instance.image.delete()

        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    def process_foreign_key_fields(self, data: Dict[str, Any]) -> None:
        """
        Process foreign key fields in the request data.

        Args:
            data (Dict): The request data.

        Raises:
            NotFound: If the related object is not found.
        """

        for field in self.foreign_key_fields:
            if field in data:
                related_class = self.serializer_class.Meta.model._meta.get_field(
                    field
                ).remote_field.model

                try:
                    related_obj = related_class.objects.get(id=data[field])
                except related_class.DoesNotExist:
                    raise NotFound(
                        detail=f"{related_class.__name__} with id {data[field]} does not exist"
                    )

                data[f"{field}"] = related_obj.id

    def process_many_to_many_fields(
        self, data: Dict[str, Any], model_fields: List[Any]
    ) -> None:
        """
        Process many-to-many fields in the request data.

        Args:
            data (Dict): The request data.
            model_fields (List[Field]): The model fields.

        Raises:
            NotFound: If the related object is not found.
        """

        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        self.mtm_fields = {
            field.name: ""
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for field in model_fields:
            if isinstance(field, ForeignKey) and field.name == "tag":
                related_class = field.remote_field.model
                if "tag" in data and not data["tag"].isnumeric():
                    tag = data.pop("tag", None)
                    tag_obj, created = related_class.objects.get_or_create(name=tag[0])
                    data["tag"] = tag_obj.id

            elif isinstance(field, ForeignKey):
                related_class = field.remote_field.model

                if field.name in data:
                    obj = data.pop(field.name, None)
                    foo_obj, created = related_class.objects.get_or_create(id=obj[0])
                    data[field.name] = foo_obj.id

            elif isinstance(field, ManyToManyField):
                self.mtm_fields[field.name] = field.remote_field.model

        self.mtm_values = {
            field.name: []
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in self.mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = self.mtm_fields[
                        name
                    ].model.objects.get_or_create(id=value)
                    self.mtm_values[name].append(element_obj)

    def process_author_field(self, request: HttpRequest, data: Dict[str, Any]):
        """
        Process the author field in the request data.

        Args:
            request (Request): The request object.
            data (Dict): The request data.
        """

        author = User.objects.get(username=request.username)
        data["author"] = author.id

    def check_data_for_images(
        self, instance: Model, request: HttpRequest
    ) -> Dict[str, Any]:
        """
        Check the request data for image fields.

        Args:
            instance (Model): The instance object.
            request (Request): The request object.

        Returns:
            Dict: The updated request data.
        """

        image_field_name = None

        for field in instance._meta.fields:
            if isinstance(field, ImageField):
                image_field_name = field.name

        if image_field_name is not None:
            image = request.FILES.get(image_field_name)

            if image is None or image == getattr(instance, image_field_name):
                data = request.data.copy()
                data[image_field_name] = getattr(instance, image_field_name)
            else:
                getattr(instance, image_field_name).delete()

                data = request.data.copy()
        else:
            data = request.data.copy()

        return data


class BaseListView(generics.ListCreateAPIView):
    serializer_class = None
    model_class = None
    foreign_key_fields = []
    mtm_fields = {}
    mtm_values = {}

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        if self.foreign_key_fields:
            self.process_foreign_key_fields(data)

        if self.mtm_fields:
            self.process_many_to_many_fields(data, model_fields)

        if any(field.name == "author" for field in model_fields):
            self.process_author_field(request, data)

        serializer = self.model_class.serializer_class(data=data)

        serializer.is_valid()
        print(serializer.errors)

        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        if self.mtm_values:
            for field in self.mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(self.mtm_values[field])

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.model_class.objects.all()

    def process_foreign_key_fields(self, data):
        for field in self.foreign_key_fields:
            if field in data:
                related_class = self.serializer_class.Meta.model._meta.get_field(
                    field
                ).remote_field.model

                try:
                    related_obj = related_class.objects.get(id=data[field])
                except related_class.DoesNotExist:
                    raise NotFound(
                        detail=f"{related_class.__name__} with id {data[field]} does not exist"
                    )

                data[f"{field}"] = related_obj.id

    def process_many_to_many_fields(self, data):
        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        self.mtm_fields = {
            field.name: ""
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for field in model_fields:
            if isinstance(field, ForeignKey) and field.name == "tag":
                related_class = field.remote_field.model
                if "tag" in data and not data["tag"].isnumeric():
                    tag = data.pop("tag", None)
                    tag_obj, created = related_class.objects.get_or_create(name=tag[0])
                    data["tag"] = tag_obj.id
            elif isinstance(field, ForeignKey):
                related_class = field.remote_field.model

                if field.name in data:
                    obj = data.pop(field.name, None)
                    foo_obj, created = related_class.objects.get_or_create(id=obj[0])
                    data[field.name] = foo_obj.id
            elif isinstance(field, ManyToManyField):
                self.mtm_fields[field.name] = field.remote_field.model

        self.mtm_values = {
            field.name: []
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in self.mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = self.mtm_fields[
                        name
                    ].model.objects.get_or_create(id=value)
                    self.mtm_values[name].append(element_obj)

    def process_author_field(self, request, data):
        author = User.objects.get(username=request.username)
        data["author"] = author.id

    def check_data_for_images(self, instance, request):
        image_field_name = None
        for field in instance._meta.fields:
            if isinstance(field, ImageField):
                image_field_name = field.name

        if image_field_name is not None:
            image = request.FILES.get(image_field_name)

            if image is None or image == getattr(instance, image_field_name):
                data = request.data.copy()
                data[image_field_name] = getattr(instance, image_field_name)
            else:
                getattr(instance, image_field_name).delete()

                data = request.data.copy()
        else:
            data = request.data.copy()

        return data


class BaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = None
    model_class = None
    mtm_fields = {}

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)

        image_field_name = None
        for field in instance._meta.fields:
            if isinstance(field, ImageField):
                image_field_name = field.name

        if image_field_name is not None:
            image = request.FILES.get(image_field_name)

            if image is None or image == getattr(instance, image_field_name):
                data = request.data.copy()
                data[image_field_name] = getattr(instance, image_field_name)
            else:
                getattr(instance, image_field_name).delete()

                data = request.data.copy()
        else:
            data = request.data.copy()

        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        mtm_fields = {
            field.name: ""
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for field in model_fields:
            if isinstance(field, ForeignKey) and field.name == "tag":
                related_class = field.remote_field.model
                if "tag" in data and not data["tag"].isnumeric():
                    tag = data.pop("tag", None)
                    tag_obj, created = related_class.objects.get_or_create(name=tag[0])
                    data["tag"] = tag_obj.id
            elif isinstance(field, ForeignKey):
                related_class = field.remote_field.model
                if field.name in data:
                    obj = data.pop(field.name, None)
                    foo_obj, created = related_class.objects.get_or_create(id=obj[0])
                    data[field.name] = foo_obj.id

            elif isinstance(field, ManyToManyField):
                mtm_fields[field.name] = field.remote_field.model

        mtm_values = {
            field.name: []
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = mtm_fields[name].objects.get_or_create(
                        id=value
                    )
                    mtm_values[name].append(element_obj)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if mtm_values:
            for field in mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(mtm_values[field])

        changes = return_changes(instance, old_instance)

        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if hasattr(instance, "image") and instance.image is not None:
            instance.image.delete()

        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return self.model_class.objects.all()


class BaseBulkView(generics.DestroyAPIView, generics.UpdateAPIView):
    serializer_class = None
    model_class = None

    def destroy(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=ids)

        for obj in queryset:
            if hasattr(obj, "image") and obj.image is not None:
                obj.image.delete()

        deleted = queryset.delete()

        if self.model_class.__name__ == "Messages":
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        if deleted[0] == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        field = request.data.get("field")
        value = request.data.get("value")

        if not field or value is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=ids)

        if field[0] == "is_archived":
            print({field[0]: value, "is_read": True})
            updated = queryset.update(**{field[0]: value, "is_read": True})

        if field[0] == "is_read" and value == True:
            updated = queryset.update(**{field[0]: value})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        elif field[0] == "is_read" and value == False:
            updated = queryset.update(**{field[0]: value, "is_archived": False})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        if updated == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
