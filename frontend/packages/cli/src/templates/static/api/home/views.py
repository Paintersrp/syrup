from rest_framework import generics, mixins
from rest_framework.response import Response
from django.http import JsonResponse
from .models import *
from .serializers import *
from api.utils import get_serialized_page_data
from api.custom_views import *


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


class HeroHeaderView(SyView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader
    lookup_field = "pk"


class HeroHeaderAPIView(BaseListView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader


class HeroHeaderDetailAPIView(BaseDetailView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader


class HeroHeaderBulkAPIView(BaseBulkView):
    queryset = HeroHeader.objects.all()
    serializer_class = HeroHeaderSerializer
    model_class = HeroHeader


class SectionHeaderAPIView(BaseListView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader


class SectionHeaderUpdateAPIView(BaseDetailView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader


class SectionHeaderDetailAPIView(BaseDetailView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader
    lookup_field = "name"


class SectionHeaderBulkAPIView(BaseBulkView):
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    model_class = SectionHeader


class PostListCreateView(BaseListView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    model_class = Post


# class PostListCreateView(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     def create(self, request, *args, **kwargs):
#         form_data = request.data

#         if request.FILES.get("image"):
#             image = request.FILES.get("image")
#         else:
#             image = None

#         author = User.objects.get(username=request.username)

#         data = {
#             "title": form_data.get("title"),
#             "content": form_data.get("content"),
#             "tags": form_data.get("tags"),
#             "image": image,
#             "author": author.id,
#         }

#         if isinstance(data.get("tags"), str):
#             tags = data["tags"].split(",")
#             data["tags"] = [{"detail": tag.strip()} for tag in tags]

#         serializer = PostSerializer(data=data)

#         if serializer.is_valid():
#             data["content"] = data["content"].replace("<img", "<img class='media'")
#             instance = serializer.save()

#             # create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

#             return JsonResponse(serializer.data, status=201)

#         print(serializer.errors)

#         return JsonResponse(serializer.errors, status=400)

#     def perform_create(self, serializer):
#         return serializer.save()


class RecentPostView(PostListCreateView):
    def get(self, request, *args, **kwargs):
        recent_posts = self.queryset.order_by("-created_at")[:3]
        serializer = self.serializer_class(recent_posts, many=True)

        return JsonResponse(serializer.data, safe=False)


class HighlightedPostView(generics.ListCreateAPIView):
    queryset = Post.objects.filter(is_highlighted=True)
    serializer_class = PostSerializer


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        old_instance = Post.objects.get(pk=post.pk)
        formatted_data = self.serializer_class().format_data(request.data)
        author = User.objects.get(username=request.username)

        title = formatted_data.get("title", post.title)
        content = formatted_data.get("content", post.content)
        tag_list = formatted_data.get("tags", [])

        tag_objs = []
        for tag in tag_list:
            tag_obj, created = PostTag.objects.get_or_create(detail=tag)
            tag_objs.append(tag_obj)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            post.image.storage.delete(post.image.path)
            post.image = image
        else:
            image = post.image

        post.title = title
        post.content = content
        post.image = image
        post.author = author

        post.save()
        post.tags.set(tag_objs)

        serializer = self.get_serializer(post)

        changes = return_changes(post, old_instance)
        # create_log_entry(
        #     LogEntry.Action.UPDATE,
        #     request.username if request.username else None,
        #     post,
        #     changes,
        # )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        # create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TagsView(BaseListView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer
    model_class = PostTag


class TagsRetrieveUpdateDestroyView(BaseDetailView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer
    model_class = PostTag


class TagsBulkAPIView(BaseBulkView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer
    model_class = PostTag
