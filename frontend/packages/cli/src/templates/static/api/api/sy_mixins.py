import re
from typing import Dict, Any, List, Tuple

from auditlog.models import LogEntry
from django.db.models import ForeignKey, ManyToManyField, Model, ImageField
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import NotFound

from authorization.models import User


class SyProcessingMixin:
    def pre_process_fields(
        self,
        request,
        data: Dict[str, Any],
        model_fields: List[Any],
        update: bool = False,
    ) -> None:
        """
        Pre-process the fields in the request data.
        """

        if self.fk_fields:
            self.process_foreign_key_fields(data, update)

        if self.mtm_fields:
            self.process_many_to_many_fields(data, model_fields)

        if any(field.name == "author" for field in model_fields):
            self.process_author_field(request, data)

    def process_foreign_key_fields(
        self,
        data: Dict[str, Any],
        update: bool = False,
    ) -> None:
        """
        Process foreign key fields in the request data.
        """

        for field in self.fk_fields:
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

                if update:
                    instance = self.get_object()
                    setattr(instance, field, related_obj)

    def process_many_to_many_fields(
        self,
        data: Dict[str, Any],
        model_fields: List[Any],
    ) -> None:
        """
        Process many-to-many fields in the request data.
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

        pop_keys = []

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in self.mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = self.mtm_fields[name].objects.get_or_create(
                        id=value
                    )
                    self.mtm_values[name].append(element_obj)

                pop_keys.append(key)

        for key in pop_keys:
            data.pop(key, None)

    def process_author_field(
        self,
        request,
        data: Dict[str, Any],
    ) -> None:
        """
        Process the author field in the request data.
        """

        author = User.objects.get(username=request.username)
        data["author"] = author.id

    def check_data_for_images(self, instance, request) -> Dict[str, Any]:
        """
        Check the request data for image fields.
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

    def update_instance_mtm_fields(self, instance) -> None:
        """
        Update the ManyToMany fields of the instance.
        """

        for field in self.mtm_values:
            instance_field = getattr(instance, field)
            instance_field.set(self.mtm_values[field])


class SyLoggingMixin:
    def log_entry(
        self,
        request,
        instance,
        old_instance,
        type="create",
    ) -> None:
        """
        Log the entry for the instance.
        """

        change_str = (
            self.return_changes(instance, old_instance) if type == "update" else None
        )

        action = (
            LogEntry.Action.UPDATE
            if type == "update"
            else LogEntry.Action.CREATE
            if type == "create"
            else LogEntry.Action.DELETE
        )

        self.__create_log_entry(
            action,
            request.username if request.username else None,
            instance,
            change_str,
        )

    def __create_log_entry(
        self, action: str, username: str, instance: Model, changes: str
    ) -> None:
        """
        Create a log entry for the given action, username, instance, and changes.
        """

        content_type = ContentType.objects.get_for_model(instance)

        if not changes:
            changes = ""

        log_entry = LogEntry(
            content_type=content_type,
            object_id=instance.pk,
            object_repr=str(instance),
            action=action,
            actor=username,
            changes=changes,
            timestamp=timezone.now(),
        )
        log_entry.save()

    def return_changes(self, instance: Model, old_instance: Model) -> str:
        """
        Return the changes made between the instance and the old instance.
        """

        changes: Dict[str, Tuple[str, str]] = {}

        for field in instance._meta.fields:
            field_name = field.name
            if str(getattr(instance, field_name)) != str(
                getattr(old_instance, field_name)
            ):
                changes[field_name] = [
                    getattr(old_instance, field_name),
                    getattr(instance, field_name),
                ]

        change_message_str: str = ""
        num_changes = len(changes)

        for i, (field, values) in enumerate(changes.items()):
            old_value, new_value = values
            change_message_str += f"{field}: {old_value} -> {new_value}"
            if i < num_changes - 1:
                change_message_str += ", "

        return change_message_str
