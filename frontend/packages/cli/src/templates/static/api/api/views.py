from typing import Optional, Dict, Any, List, Union
from datetime import datetime

from auditlog.models import LogEntry
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView
from django.apps import apps
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import Http404, HttpRequest, HttpResponse
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models import Q


from api.sy_views import SyMetaView


class ModelMetadataAPIView(APIView):
    """
    API view for retrieving metadata of a specific model.
    """

    def get(self, request, model_name: str) -> Response:
        """
        Handles the GET request and retrieves the metadata of a specific model. It takes the model_name as a parameter and returns the metadata as a JSON response.
        """

        all_models = apps.get_models(include_auto_created=True)
        model = next(
            (m for m in all_models if m.__name__.lower() == model_name.lower()), None
        )

        if model is None:
            return {}

        serializer_class = getattr(
            model, "serializer_class", serializers.ModelSerializer
        )
        serializer = serializer_class()
        fields = serializer.get_fields()

        if hasattr(model._meta, "filter_choices"):
            filter_choices = self.get_filter_choices(
                model,
                model._meta.filter_options
                if hasattr(model._meta, "filter_options")
                else None,
            )

        metadata = self.build_initial_metadata(model, filter_choices)

        for field_name, field in fields.items():
            self.append_field_metadata(field_name, field, model, metadata)

        for field in model._meta.fields:
            self.append_sy_metadata(field, metadata)

        if not metadata:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(metadata)

    def get_filter_choices(
        self, model: models.Model, filter_options: Optional[List[str]]
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Retrieves the filter choices for the specified model. It takes the model object and the filter_options as parameters and returns a dictionary containing the filter choices for each filter option.
        """

        filter_choices = {}

        for option in filter_options:
            field = model._meta.get_field(option)
            if isinstance(field, models.ForeignKey) or isinstance(
                field, models.ManyToManyField
            ):
                related_model = field.related_model
                choices_qs = related_model.objects.all()
                choices = [{"value": c.pk, "display_name": str(c)} for c in choices_qs]
            else:
                choices_qs = (
                    model.objects.order_by().values_list(option, flat=True).distinct()
                )
                choices = [{"value": c, "display_name": str(c)} for c in choices_qs]

            filter_choices[option] = choices

        return filter_choices

    def build_initial_metadata(
        self, model: models.Model, filter_choices: Dict[str, List[Dict[str, Any]]]
    ) -> Dict[str, Any]:
        """
        Builds the initial metadata dictionary for the specified model. It takes the model object and the filter_choices as parameters and returns a dictionary containing the initial metadata.
        """

        return {
            "modelName": model.__name__,
            "verboseName": model._meta.verbose_name,
            "verboseNamePlural": model._meta.verbose_name_plural,
            "appLabel": model._meta.app_label,
            "primaryKey": model._meta.pk.name,
            "ordering": model._meta.ordering,
            "uniqueTogether": model._meta.unique_together,
            "indexes": model._meta.indexes,
            "permissions": model._meta.permissions,
            "abstract": model._meta.abstract,
            "fields": {},
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
            "filter_options": model._meta.filter_options
            if hasattr(model._meta, "filter_options")
            else None,
            "filter_choices": filter_choices,
            "allowed": model._meta.allowed if hasattr(model._meta, "allowed") else None,
            "category": model._meta.category
            if hasattr(model._meta, "category")
            else None,
        }

    def append_field_metadata(
        self,
        field_name: str,
        field: models.Field,
        model: models.Model,
        metadata: Dict[str, Any],
    ) -> None:
        """
        Appends the field metadata to the metadata dictionary. It takes the field_name, field, model, and metadata as parameters and modifies the metadata dictionary with the field metadata.
        """

        all_fields_choices = []
        field_names = [f.name for f in model._meta.get_fields()]

        if field_name not in field_names:
            return

        if isinstance(field, models.ForeignKey):
            field_type = "ForeignKey"
        else:
            field_type = field.__class__.__name__

        if field_type == "CharField" and "base_template" in field.style:
            field_type = "TextField"

        choices = getattr(field, "choices", None)

        if choices:
            if field_name == "content":
                choices_dict = dict(choices)

                for value, display in choices_dict.items():
                    content_type = ContentType.objects.get_for_id(value)
                    try:
                        content_model_name = content_type.model_class().__name__
                        content_model_category = (
                            content_type.model_class()._meta.category
                        )

                        field_choices = {
                            "value": value,
                            "display": display,
                            "model_name": content_model_name,
                            "category": content_model_category,
                        }
                    except:
                        field_choices = {"value": value, "display": display}

                    all_fields_choices.append(field_choices)
            else:
                choices_dict = dict(choices)
                field_choices = [
                    {"value": value, "display": display}
                    for value, display in choices_dict.items()
                ]
                all_fields_choices.append(field_choices)
        else:
            field_choices = None

        field_metadata = {
            "type": field_type,
            "required": field.required,
            "read_only": field.read_only,
            "label": field.label,
            "help_text": field.help_text,
            "min_length": getattr(field, "min_length", None),
            "max_length": getattr(field, "max_length", None),
            "min_value": getattr(field, "min_value", None),
            "max_value": getattr(field, "max_value", None),
            "source": getattr(field, "source", None),
            "choices": all_fields_choices,
            "verbose_name": getattr(
                model._meta.get_field(field_name), "verbose_name", None
            ),
        }

        metadata["fields"][field_name] = field_metadata

    def append_sy_metadata(self, field: models.Field, metadata: Dict[str, Any]) -> None:
        """
        Appends custom metadata for fields to the metadata dictionary. It takes the field and metadata as parameters and modifies the metadata dictionary with the custom metadata for the field.
        """

        if not field.name == "password" and not field.name == "salt":
            if hasattr(field, "xs_column_count"):
                metadata["fields"][field.name]["xs_column_count"] = getattr(
                    field, "xs_column_count", 12
                )

            if hasattr(field, "md_column_count"):
                metadata["fields"][field.name]["md_column_count"] = getattr(
                    field, "md_column_count", 12
                )

            if hasattr(field, "justify"):
                metadata["fields"][field.name]["justify"] = getattr(
                    field, "justify", "left"
                )

            if hasattr(field, "markdown"):
                metadata["fields"][field.name]["markdown"] = getattr(
                    field, "markdown", "false"
                )
            if hasattr(field, "min_rows"):
                metadata["fields"][field.name]["min_rows"] = getattr(
                    field, "min_rows", 6
                )


class ModelEndpointAPIView(SyMetaView):
    """
    API view that returns information about all models in the Django app.

    Retrieves information about the models and their corresponding endpoints,
    including serializer classes and app configurations.
    """

    def get(self, request):
        models = apps.get_models(include_auto_created=False)
        app_configs = {
            app_config.label: app_config for app_config in apps.get_app_configs()
        }

        endpoints = {
            "configs": {},
            "models": {},
        }

        for app_label, app_config in app_configs.items():
            if hasattr(app_config, "visibility"):
                if app_config.visibility == True:
                    self.process_app(app_label, app_config, endpoints)

        for model in models:
            serializer_class = getattr(model, "serializer_class", None)

            if serializer_class:
                endpoint = self.process_model(model, serializer_class)
                app_name = model._meta.app_label
                endpoints["models"][app_name].append(endpoint)

        return Response(endpoints)


class SingleModelAPIView(SyMetaView):
    """
    API view that returns information about a single model in the Django app.

    Retrieves information about the specified model and its corresponding endpoint,
    including the serializer class.
    """

    def get(self, request, model_name=None):
        models = apps.get_models(include_auto_created=True)
        model = None

        for m in models:
            if m.__name__.lower() == model_name:
                model = m
                break

        if model is None:
            raise Http404("Model not found")

        serializer_class = getattr(model, "serializer_class", None)

        if serializer_class is None:
            raise Http404("Serializer class not found")

        endpoint = self.process_model(model, serializer_class)

        return Response(endpoint)


class SingleAppEndpointAPIView(SyMetaView):
    """
    API view that returns information about a single app in the Django project.

    Retrieves information about the specified app, including its models,
    app configuration, and corresponding endpoints.
    """

    def get(self, request, app_name=None, format=None):
        app_config = apps.get_app_config(app_name)
        models = app_config.get_models()

        endpoints = {
            "models": {},
            "config": None,
        }

        if hasattr(app_config, "visibility"):
            endpoints["config"] = {
                "icon": app_config.icon if hasattr(app_config, "icon") else None,
                "links": app_config.links if hasattr(app_config, "links") else None,
                "visibility": app_config.visibility
                if hasattr(app_config, "visibility")
                else None,
                "app_info": self.analyze_app(app_config.get_models()),
            }
            endpoints["models"][app_config.label] = []

        for model in models:
            serializer_class = getattr(model, "serializer_class", None)

            if serializer_class:
                endpoint = self.process_model(model, serializer_class)
                endpoints["models"][app_config.label].append(endpoint)

        return Response(endpoints)


@method_decorator(csrf_exempt, name="dispatch")
class RecentAdminActionsView(APIView):
    """
    API view that returns the recent admin actions.

    This view retrieves the recent admin actions from the LogEntry model and provides them as JSON response.
    The actions can be filtered by app_label, model_query, and items count.
    """

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        """
        Handles the GET request and returns the recent admin actions. It retrieves the query parameters for items, app, and model_query from the request, and calls the `get_recent_actions` method to get the recent admin actions based on the provided filters. It then builds the action data and returns it as a JSON response.
        """

        items = request.query_params.get("items", 10)
        app = request.query_params.get("app", None)
        model_query = request.query_params.get("model", None)

        if items == "all":
            recent_actions = self.get_recent_actions(app, model_query)
        else:
            recent_actions = self.get_recent_actions(app, model_query, int(items))

        data = []

        for action in recent_actions:
            self.build_action(action, data)

        return Response(data)

    def get_content_type(self, app_label: str, model_query: str = "") -> ContentType:
        """
        Retrieves the ContentType object based on the provided app_label and model_query. If the model_query is empty, it retrieves the ContentType based on the app_label only. If the model_query is provided, it retrieves the ContentType based on both the app_label and model_query.
        """

        if model_query == "":
            content_type = ContentType.objects.get(app_label=app_label)
        else:
            content_type = ContentType.objects.get(
                app_label=app_label, model=model_query.lower()
            )
        return content_type

    def get_recent_actions(
        self, app_label: str = "", model_query: str = "", items: int = 10
    ) -> List[LogEntry]:
        """
        Retrieves the recent admin actions based on the provided filters. It accepts optional filters for app_label, model_query, and items count. If the app_label is provided, it filters the actions by app_label.  If the model_query is provided, it filters the actions by both app_label and model_query. If the items count is provided, it limits the number of actions returned.
        """

        if app_label:
            content_type_filter = Q(content_type__app_label=app_label)
        else:
            content_type_filter = Q()

        if model_query:
            content_type = self.get_content_type(app_label, model_query)
            content_type_filter &= Q(content_type=content_type)

        recent_actions = LogEntry.objects.filter(content_type_filter).order_by(
            "-timestamp"
        )

        if items is not None:
            recent_actions = recent_actions[:items]

        return recent_actions

    def build_action(
        self, action: LogEntry, data: List[Dict[str, Union[str, datetime]]]
    ) -> None:
        """
        Appends the admin action to the data list. It takes an action object and a data list as parameters. It extracts the relevant information from the action object, such as user, action time, action flag, content type, app label, model name, object ID, object representation, change message, and object URL. It then appends the information to the data list.
        """

        object_repr = action.object_repr
        change_message = action.changes
        app_label = action.content_type.app_label
        model_name = action.content_type.model

        try:
            model_class = apps.get_model(app_label=app_label, model_name=model_name)
            model_verbose_name = model_class._meta.verbose_name.title()
        except:
            model_verbose_name = "Not Found"

        change_message, obj_url = self.get_action_details(change_message, action)

        data.append(
            {
                "user": str(action.actor),
                "action_time": action.timestamp,
                "action_flag": action.get_action_display().capitalize(),
                "content_type": str(action.content_type),
                "app_label": app_label.capitalize(),
                "model_name": model_verbose_name,
                "object_id": str(action.object_pk),
                "object_repr": object_repr,
                "change_message": change_message.format(object_repr=object_repr),
                "obj_url": obj_url(action, model_name)
                if callable(obj_url)
                else obj_url,
            }
        )

    def get_action_details(self, change_message, action):
        """
        Retrieves the action details based on the given change_message and action. It maps the action to its corresponding change_message and object URL, and returns the change_message and object URL as a tuple.
        """

        action_dict = {
            LogEntry.Action.CREATE: {
                "change_message": "Added {object_repr}",
                "obj_url": lambda action, model_name: self.get_obj_url(
                    action, model_name
                ),
            },
            LogEntry.Action.UPDATE: {
                "change_message": change_message,
                "obj_url": lambda action, model_name: self.get_obj_url(
                    action, model_name
                ),
            },
            LogEntry.Action.DELETE: {
                "change_message": "Deleted {object_repr}",
                "obj_url": "Not Applicable",
            },
        }

        action_details = action_dict.get(action.action, {})

        return action_details.get("change_message", ""), action_details.get("obj_url")

    def get_obj_url(self, action, model_name):
        """
        Retrieves the object URL for the given action and model name. It checks if the object can be retrieved using the content type and object_pk or object_id. It constructs the object URL based on the model name and object primary key, and returns the object URL.
        """
        try:
            obj = action.content_type.get_object_for_this_type(pk=action.object_pk)
            obj_url = self.__obj_url_check_name(model_name, obj)
        except:
            try:
                obj = action.content_type.get_object_for_this_type(pk=action.object_id)
                obj_url = self.__obj_url_check_name(model_name, obj)
            except:
                obj_url = "Object not found"

        return obj_url

    def __obj_url_check_name(self, model_name, obj):
        """
        This method checks the model name and returns the object URL based on the model name and object primary key. It constructs the object URL using the model name and object primary key, and returns the object URL.
        """
        if model_name == "messages" or model_name == "application":
            obj_url = f"/admin/{model_name}/read/{obj.pk}/"
        else:
            obj_url = f"/admin/{model_name}/control/{obj.pk}/"

        return obj_url

    dispatch = method_decorator(cache_page(60 * 5))(APIView.dispatch)


# @method_decorator(csrf_exempt, name="dispatch")
# class RecentAdminActionsView(APIView):
#     def get(self, request, *args, **kwargs):
#         items = request.query_params.get("items", 10)
#         app = request.query_params.get("app", None)
#         model_query = request.query_params.get("model", None)

#         if items == "all":
#             if app:
#                 recent_actions = LogEntry.objects.filter(
#                     content_type__app_label=app
#                 ).order_by("-timestamp")
#             elif model_query:
#                 if model_query == "messages":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="support"
#                     )
#                 elif (
#                     model_query == "questionnaire"
#                     or model_query == "questionset"
#                     or model_query == "question"
#                     or model_query == "answerchoice"
#                 ):
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="quizes"
#                     )
#                 elif model_query == "teammember":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="contact"
#                     )
#                 elif (
#                     model_query == "servicetablelabels"
#                     or model_query == "servicecomparerows"
#                     or model_query == "servicetable"
#                 ):
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="tables"
#                     )
#                 elif model_query == "header":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="general"
#                     )
#                 elif model_query == "contactinformation":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="contact"
#                     )
#                 elif model_query == "page":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="pages"
#                     )
#                 elif model_query == "faq":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="faqs"
#                     )

#                 else:
#                     content_type = ContentType.objects.get(model=model_query.lower())

#                 recent_actions = LogEntry.objects.filter(
#                     content_type=content_type
#                 ).order_by("-timestamp")
#             else:
#                 recent_actions = LogEntry.objects.order_by("-timestamp")
#         else:
#             if app:
#                 recent_actions = LogEntry.objects.filter(
#                     content_type__app_label=app
#                 ).order_by("-timestamp")[: int(items)]

#             elif model_query:
#                 if model_query == "messages":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="support"
#                     )
#                 elif (
#                     model_query == "questionnaire"
#                     or model_query == "questionset"
#                     or model_query == "question"
#                     or model_query == "answerchoice"
#                 ):
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="quizes"
#                     )
#                 elif model_query == "teammember":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="contact"
#                     )
#                 elif (
#                     model_query == "servicetablelabels"
#                     or model_query == "servicecomparerows"
#                     or model_query == "servicetable"
#                 ):
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="tables"
#                     )
#                 elif model_query == "header":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="general"
#                     )
#                 elif model_query == "contactinformation":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="contact"
#                     )
#                 elif model_query == "page":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="pages"
#                     )
#                 elif model_query == "faq":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="faqs"
#                     )
#                 elif model_query == "servicetier":
#                     content_type = ContentType.objects.get(
#                         model=model_query.lower(), app_label="services"
#                     )

#                 else:
#                     content_type = ContentType.objects.get(model=model_query.lower())

#                 recent_actions = LogEntry.objects.filter(
#                     content_type=content_type
#                 ).order_by("-timestamp")[: int(items)]
#             else:
#                 recent_actions = LogEntry.objects.order_by("-timestamp")[: int(items)]

#         data = []
#         for action in recent_actions:
#             object_repr = action.object_repr
#             change_message = action.changes
#             app_label = action.content_type.app_label
#             model_name = action.content_type.model
#             change_message_str = ""

#             try:
#                 model_class = apps.get_model(app_label=app_label, model_name=model_name)
#                 model_verbose_name = model_class._meta.verbose_name.title()
#             except:
#                 model_verbose_name = "Not Found"

#             if action.action == LogEntry.Action.CREATE:
#                 object_repr = f"Added {object_repr}"
#                 change_message_str = object_repr
#                 try:
#                     obj = action.content_type.get_object_for_this_type(
#                         pk=action.object_pk
#                     )

#                     if model_name == "messages" or model_name == "application":
#                         obj_url = f"/admin/{model_name}/read/{obj.pk}/"
#                     else:
#                         obj_url = f"/admin/{model_name}/control/{obj.pk}/"
#                 except:
#                     try:
#                         obj = action.content_type.get_object_for_this_type(
#                             pk=action.object_id
#                         )

#                         if model_name == "messages" or model_name == "application":
#                             obj_url = f"/admin/{model_name}/read/{obj.pk}/"
#                         else:
#                             obj_url = f"/admin/{model_name}/control/{obj.pk}/"
#                     except:
#                         obj_url = "Object not found"

#             elif action.action == LogEntry.Action.UPDATE:
#                 object_repr = f"Changed {object_repr}"
#                 change_message_str = change_message

#                 try:
#                     obj = action.content_type.get_object_for_this_type(
#                         pk=action.object_pk
#                     )

#                     if model_name == "messages" or model_name == "application":
#                         obj_url = f"/admin/{model_name}/read/{obj.pk}/"
#                     else:
#                         obj_url = f"/admin/{model_name}/control/{obj.pk}/"
#                 except:
#                     try:
#                         obj = action.content_type.get_object_for_this_type(
#                             pk=action.object_id
#                         )

#                         if model_name == "messages" or model_name == "application":
#                             obj_url = f"/admin/{model_name}/read/{obj.pk}/"
#                         else:
#                             obj_url = f"/admin/{model_name}/control/{obj.pk}/"
#                     except:
#                         obj_url = "Failed"

#             elif action.action == LogEntry.Action.DELETE:
#                 object_repr = f"Deleted {object_repr}"
#                 change_message_str = object_repr
#                 obj_url = "Not Applicable"

#             data.append(
#                 {
#                     "user": str(action.actor),
#                     "action_time": action.timestamp,
#                     "action_flag": action.get_action_display().capitalize(),
#                     "content_type": str(action.content_type),
#                     "app_label": app_label.capitalize(),
#                     "model_name": model_verbose_name,
#                     "object_id": str(action.object_pk),
#                     "object_repr": object_repr,
#                     "change_message": change_message_str,
#                     "obj_url": obj_url,
#                 }
#             )

#         return Response(data)

#     dispatch = method_decorator(cache_page(60 * 5))(APIView.dispatch)


# Needs Testing, left previous in for refactor if needed
