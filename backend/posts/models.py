from django.db import models
from authorization.models import User
from backend.customs import *
from .metadata import *


class HighlightedPostsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_highlighted=True)


@metadata(**POSTTAG_METADATA)
class PostTag(models.Model):
    detail = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.detail

    def post_count(self):
        return self.post_set.count()

    post_count.short_description = "Post Count"

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"


@metadata(**POST_METADATA)
class Post(models.Model):
    title = CustomCharField(
        max_length=255,
    )
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(
        PostTag,
        related_name="post",
        verbose_name="Tags",
    )
    image = models.ImageField(
        blank=True,
        null=True,
        upload_to="post_images",
    )
    is_highlighted = models.BooleanField(default=False)

    highlighted_objects = HighlightedPostsManager()
    objects = models.Manager()

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
