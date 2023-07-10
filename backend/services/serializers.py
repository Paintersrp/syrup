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

    def is_valid(self, raise_exception=False):
        formatted_data = self.format_data(self.initial_data)
        self._validated_data = formatted_data
        self._errors = {}
        return not bool(self.errors)

    def format_data(self, data):
        formatted_data = {}

        for key, value in data.items():
            name = key.split("[")[0]
            formatted_data[name] = value

        return formatted_data

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        self.clear_nested_instances(instance.features)
        self.clear_nested_instances(instance.supported_sites)

        return instance

    def clear_nested_instances(self, instance_list):
        instance_mapping = {
            str(instance.id): instance for instance in instance_list.all()
        }

        for instance in instance_mapping.values():
            instance_list.remove(instance)


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
    # servicetier = serializers.StringRelatedField(source="servicetier.service_title")
    FIELD_KEYS = [
        "image",
        "servicetier",
    ]

    class Meta:
        model = ProcessImageItem
        fields = "__all__"


class ContentTextBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "slug",
        "title",
        "description",
    ]

    class Meta:
        model = ContentTextBlock
        fields = [
            "id",
            "slug",
            "title",
            "description",
        ]


Feature.serializer_class = FeatureSerializer
SupportedSites.serializer_class = SupportedSitesSerializer
ServiceTier.serializer_class = ServiceTierSerializer
ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
ContentTextBlock.serializer_class = ContentTextBlockSerializer
