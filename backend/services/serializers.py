import re
from rest_framework import serializers
from .models import *


class FeatureSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Feature
        fields = "__all__"


class SupportedSitesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = SupportedSites
        fields = "__all__"


class ServiceTierSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True)
    supported_sites = SupportedSitesSerializer(many=True)
    FIELD_KEYS = [
        "service_title",
        "price",
        "image",
    ]

    class Meta:
        model = ServiceTier
        fields = "__all__"

    def format_data(self, data):
        formatted_data = {"features": [], "supported_sites": []}

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "features":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    feature_detail = value
                    formatted_data[name].append(feature_detail)

            elif name == "supported_sites":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    supported_site_detail = value
                    formatted_data[name].append(supported_site_detail)

            else:
                formatted_data[name] = value

        return formatted_data


class BenefitsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "page_link",
    ]

    class Meta:
        model = Benefits
        fields = [
            "id",
            "icon",
            "title",
            "page_link",
            "description",
            "buttonText",
        ]


class ProcessTextItemSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "icon",
    ]

    class Meta:
        model = ProcessTextItem
        fields = "__all__"


class ProcessImageItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    servicetier = serializers.StringRelatedField(source="servicetier.service_title")
    FIELD_KEYS = [
        "image",
        "servicetier",
    ]

    class Meta:
        model = ProcessImageItem
        fields = "__all__"


Feature.serializer_class = FeatureSerializer
SupportedSites.serializer_class = SupportedSitesSerializer
ServiceTier.serializer_class = ServiceTierSerializer
ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
