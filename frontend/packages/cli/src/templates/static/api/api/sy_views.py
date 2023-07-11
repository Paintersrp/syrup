from typing import Dict, Any, List, Type

from django.shortcuts import get_object_or_404
from django.db.models import Model, QuerySet
from django.urls import reverse, NoReverseMatch
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from .sy_mixins import *


class SyBaseView(
    generics.ListCreateAPIView,
    generics.RetrieveUpdateDestroyAPIView,
    SyLoggingMixin,
    SyProcessingMixin,
):
    """
    Base view containing shared functionality / inheritance
    """

    serializer_class: Type[Serializer] = None
    model_class: Type[Model] = None
    fk_fields: List[str] = []
    mtm_fields: Dict[str, str] = {}
    mtm_values: Dict[str, List[Any]] = {}

    def get_queryset(self) -> QuerySet:
        """
        Get the queryset for the view.
        """

        return self.model_class.objects.all()

    def perform_create(self, serializer: Serializer) -> None:
        """
        Perform create operation using the serializer.
        """

        return serializer.save()

    def get_object(self) -> Model:
        """
        Retrieve the object based on the given lookup parameters.
        """

        pk = self.kwargs.get("pk")
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj


class SyListCreateView(SyBaseView):
    """
    Extends base view with create operations.
    """

    def create(self, request, *args, **kwargs) -> Response:
        """
        Handle POST requests for object creation.
        """

        data = request.data.copy()
        model_fields = self.serializer_class.Meta.model._meta.get_fields()
        self.pre_process_fields(request, data, model_fields, False)

        serializer = self.model_class.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        self.update_instance_mtm_fields(instance)
        self.log_entry(request, instance, None, "create")

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SyUpdateDestroyView(SyBaseView):
    """
    Extends base view with combined update and destroy operations.
    """

    def update(self, request, *args, **kwargs) -> Response:
        """
        Handle PUT requests for object update.
        """

        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        data = self.check_data_for_images(instance, request)
        self.pre_process_fields(request, data, model_fields, True)
        serializer = self.get_serializer(instance, data=data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        self.update_instance_mtm_fields(instance)
        self.log_entry(request, instance, old_instance, "update")

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs) -> Response:
        """
        Handle DELETE requests for object deletion.
        """

        instance = self.get_object()
        if hasattr(instance, "image") and instance.image is not None:
            instance.image.delete()

        self.perform_destroy(instance)
        self.log_entry(request, instance, None, "delete")

        return Response(status=status.HTTP_204_NO_CONTENT)


class SyBulkView(generics.DestroyAPIView, generics.UpdateAPIView):
    """
    A custom view that combines update and destroy bulk operations.
    """

    serializer_class = None
    model_class = None
    ids: List[int] = []

    def destroy(self, request, *args, **kwargs) -> None:
        """
        Delete multiple objects based on provided ids.
        """

        self.ids: List[int] = request.data.get("ids", [])

        if not self.ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=self.ids)

        for obj in queryset:
            if hasattr(obj, "image") and obj.image is not None:
                obj.image.delete()

        deleted = queryset.delete()

        if self.model_class.__name__ == "Messages":
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()

            return Response({"count": count}, status=status.HTTP_200_OK)

        if deleted[0] == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs) -> Response:
        """
        Handle PUT requests for object update.
        """

        self.ids: List[int] = request.data.get("ids", [])

        if not self.ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        field = request.data.get("field")
        value = request.data.get("value")

        if not field or value is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=self.ids)

        if field[0] == "is_archived":
            updated = queryset.update(**{field[0]: value, "is_read": True})

        if field[0] == "is_read" and value == True:
            updated = queryset.update(**{field[0]: value})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()

            return Response({"count": count}, status=status.HTTP_200_OK)

        elif field[0] == "is_read" and value == False:
            updated = queryset.update(**{field[0]: value, "is_archived": False})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()

            return Response({"count": count}, status=status.HTTP_200_OK)

        if updated == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class SyMetaView(APIView):
    """
    A custom view for processing metadata.
    """

    def analyze_app(models: List[Model]) -> Dict[str, any]:
        """
        Analyze an app and provide statistics about its models.
        """

        num_models = 0
        num_objects = 0
        model_stats = []

        for model in models:
            model_stats.append(
                {
                    "name": model._meta.verbose_name,
                    "icon": model._meta.icon,
                    "related_components": model._meta.related_components,
                    "related_components_count": len(model._meta.related_components),
                    "num_objects": model.objects.count(),
                    "visibility": model._meta.visibility,
                }
            )
            num_models += 1
            num_objects += model.objects.count()

        return {
            "num_models": num_models,
            "num_objects": num_objects,
            "models": model_stats,
        }

    def process_app(
        self, app_label: str, app_config: Any, endpoints: Dict[str, Any]
    ) -> None:
        """
        Process the app configuration and update the endpoints dictionary.
        """

        endpoints["configs"][app_label] = {
            "icon": app_config.icon if hasattr(app_config, "icon") else None,
            "links": app_config.links if hasattr(app_config, "links") else None,
            "visibility": app_config.visibility
            if hasattr(app_config, "visibility")
            else None,
        }
        endpoints["models"][app_label] = []

    def process_model(self, model: Model, serializer_class: Any) -> Dict[str, Any]:
        """
        Process the model and serializer to create the endpoint dictionary.
        """

        model_name = model.__name__.lower()

        serializer = serializer_class()
        fields = serializer.get_fields()
        metadata = {}

        for field_name, field in fields.items():
            if not field_name == "id":
                metadata[field_name] = {"type": field.__class__.__name__}

                try:
                    if model._meta.get_field(field_name).verbose_name:
                        metadata[field_name]["verbose_name"] = model._meta.get_field(
                            field_name
                        ).verbose_name
                except:
                    metadata[field_name]["verbose_name"] = None

        if "alignment" in metadata:
            metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

        try:
            url = reverse(f"{model_name}-list")
            url = url.replace("/api/", "/")
        except NoReverseMatch:
            url = None

        endpoint = self.build_endpoint(model, model_name, url, metadata, serializer)

        return endpoint

    def build_endpoint(
        model: Model,
        model_name: str,
        url: str,
        metadata: Dict[str, Any],
        serializer: Any,
    ) -> Dict[str, Any]:
        """
        Build an endpoint dictionary for a model.
        """

        return {
            "app_name": model._meta.app_label,
            "model_name": model_name,
            "verbose_name": model._meta.verbose_name,
            "verbose_name_plural": model._meta.verbose_name_plural,
            "url": url,
            "metadata": metadata,
            "keys": serializer.FIELD_KEYS,
            "search_keys": serializer.SEARCH_KEYS
            if hasattr(serializer, "SEARCH_KEYS")
            else None,
            "autoFormLabel": model._meta.autoform_label
            if hasattr(model._meta, "autoform_label")
            else None,
            "longDescription": model._meta.long_description
            if hasattr(model._meta, "long_description")
            else None,
            "shortDescription": model._meta.short_description
            if hasattr(model._meta, "short_description")
            else None,
            "pagesAssociated": model._meta.pages_associated
            if hasattr(model._meta, "pages_associated")
            else None,
            "preview": model._meta.include_preview
            if hasattr(model._meta, "include_preview")
            else False,
            "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
            "icon_class": model._meta.icon_class
            if hasattr(model._meta, "icon_class")
            else None,
            "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
            "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
            "relatedComponents": model._meta.related_components
            if hasattr(model._meta, "related_components")
            else None,
            "visibility": model._meta.visibility
            if hasattr(model._meta, "visibility")
            else None,
            "access_level": model._meta.access_level
            if hasattr(model._meta, "access_level")
            else None,
            "info_dump": model._meta.info_dump
            if hasattr(model._meta, "info_dump")
            else None,
        }
