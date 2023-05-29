from rest_framework import serializers
from .models import *
from posts.serializers import PostSerializer


class HeroBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
        "heading",
    ]

    class Meta:
        model = HeroHeader
        fields = "__all__"


class TitleBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
        "subtitle",
    ]

    class Meta:
        model = SectionHeader
        fields = "__all__"


class ProcessSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "icon",
    ]

    class Meta:
        model = Process
        fields = "__all__"


class LatestPostsSerializer(serializers.ModelSerializer):
    latest_posts = PostSerializer(many=True, read_only=True)

    FIELD_KEYS = ["name"]

    class Meta:
        model = LatestPosts
        fields = [
            "id",
            "name",
            "latest_posts",
            "title_block",
        ]


LatestPosts.serializer_class = LatestPostsSerializer
HeroHeader.serializer_class = HeroBlockSerializer
SectionHeader.serializer_class = TitleBlockSerializer
Process.serializer_class = ProcessSerializer
