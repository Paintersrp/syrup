from typing import Dict
from django.apps import apps


def get_serialized_page_data(
    model_dict: Dict[str, Dict[str, any]], request
) -> Dict[str, any]:
    """
    Get serialized data for the models in the model_dict.
    """

    data = {}
    for dto_name, model_options in model_dict.items():
        many = True

        app_label = model_options.get("app_label", {})
        model_name = model_options.get("model_name", dto_name)
        model = apps.get_model(app_label=app_label, model_name=model_name)

        if model_options.get("filter", False):
            queryset = model.objects.filter(**model_options.get("filter", {}))

        elif model_options.get("get_first", False):
            queryset = model.objects.first()
            many = False

        else:
            queryset = model.objects.all()

        serializer = model.serializer_class(
            instance=queryset, many=many, context={"request": request}
        )

        data[dto_name] = serializer.data

    return data
