from rest_framework import serializers
from .models import *
from contact.models import *
from contact.serializers import *


class AboutHeaderSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    FIELD_KEYS = [
        "name",
        "title",
        "image",
    ]

    class Meta:
        model = AboutHeader
        fields = "__all__"

    def perform_update(self, serializer):
        previous_instance = self.get_object()
        previous_image = previous_instance.image
        super().perform_update(serializer)
        new_instance = self.get_object()
        new_image = new_instance.image
        if previous_image and previous_image != new_image:
            previous_image.storage.delete(previous_image.path)


class MissionStatementSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
    ]

    class Meta:
        model = MissionStatement
        fields = "__all__"


class CompanyHistorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
    ]

    class Meta:
        model = CompanyHistory
        fields = "__all__"


class ValueSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "icon",
    ]

    class Meta:
        model = Value
        fields = "__all__"


AboutHeader.serializer_class = AboutHeaderSerializer
CompanyHistory.serializer_class = CompanyHistorySerializer
MissionStatement.serializer_class = MissionStatementSerializer
TeamMember.serializer_class = TeamMemberSerializer
Value.serializer_class = ValueSerializer
