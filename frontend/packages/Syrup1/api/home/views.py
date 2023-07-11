from rest_framework import generics, mixins
from rest_framework.response import Response
from django.http import JsonResponse

from .models import *
from .serializers import *

from api.utils import get_serialized_page_data
from api.sy_views import *


class HomeFullTestView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "hero": {
                "app_label": "home",
                "model_name": "HeroHeader",
                "get_first": True,
            },
            # "contactInfo": {
            #     "app_label": "contact",
            #     "model_name": "ContactInformation",
            #     "get_first": True,
            # },
            # "socials": {
            #     "app_label": "contact",
            #     "model_name": "Socials",
            #     "get_first": True,
            # },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class HeroHeaderMainAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer

    def get_object(self):
        return HeroHeader.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class HeroHeaderView(SyListCreateView, SyUpdateDestroyView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader
    lookup_field = "pk"


class HeroHeaderBulkView(SyBulkView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader


class SectionHeaderView(SyListCreateView, SyUpdateDestroyView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader
    lookup_field = "pk"


class SectionHeaderSearchView(SyListCreateView, SyUpdateDestroyView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader
    lookup_field = "name"


class SectionHeaderBulkView(SyBulkView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader


class PostView(SyListCreateView, SyUpdateDestroyView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    model_class = Post
    mtm_fields = ["tags"]
    fk_fields = ["author"]
    lookup_field = "pk"


class RecentPostView(PostView):
    def get(self, request, *args, **kwargs):
        recent_posts = self.queryset.order_by("-created_at")[:3]
        serializer = self.serializer_class(recent_posts, many=True)

        return JsonResponse(serializer.data, safe=False)


class HighlightedPostView(PostView):
    def get(self, request, *args, **kwargs):
        highlighted_posts = self.queryset.filter(is_highlighted=True)
        serializer = self.serializer_class(highlighted_posts, many=True)

        return JsonResponse(serializer.data, safe=False)


class TagView(SyListCreateView, SyUpdateDestroyView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer
    model_class = PostTag
    lookup_field = "pk"


class TagBulkView(SyBulkView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer
    model_class = PostTag
