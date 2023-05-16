from rest_framework import generics, status
from django.http import JsonResponse
from rest_framework.response import Response
from .models import *
from authorization.models import User
from .serializers import *
from auditlog.models import LogEntry
from backend.utils import create_log_entry, return_changes


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.data

        if request.FILES.get("image"):
            image = request.FILES.get("image")
        else:
            image = None

        author = User.objects.get(username=request.username)

        data = {
            "title": form_data.get("title"),
            "content": form_data.get("content"),
            "tags": form_data.get("tags"),
            "image": image,
            "author": author.id,
        }

        if isinstance(data.get("tags"), str):
            tags = data["tags"].split(",")
            data["tags"] = [{"detail": tag.strip()} for tag in tags]

        serializer = PostSerializer(data=data)

        if serializer.is_valid():
            data["content"] = data["content"].replace("<img", "<img class='media'")
            instance = serializer.save()

            create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

            return JsonResponse(serializer.data, status=201)

        print(serializer.errors)

        return JsonResponse(serializer.errors, status=400)

    def perform_create(self, serializer):
        return serializer.save()


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
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            post,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TagsView(generics.ListCreateAPIView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class TagsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = PostTag.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)
