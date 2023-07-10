from django.db import models
from django.db.models.signals import pre_save
from authorization.models import User

from django.dispatch import receiver
from api.customs import *
from .metadata import *


@metadata(**HERO_HEADER_METADATA)
class HeroHeader(models.Model):
    name = SyCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Hero Block Name",
        help_text="Referential Name",
        db_index=True,
    )
    title = SyCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )

    subtitle = SyTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Subtitle",
        help_text="Subtitle",
        min_rows=3,
        null=True,
        blank=True,
    )
    description = SyTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
        null=True,
        blank=True,
    )
    buttonText = SyCharField(
        max_length=50,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Button Text",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Hero Header"
        verbose_name_plural = verbose_name + "s"


@metadata(**SECTION_HEADER_METADATA)
class SectionHeader(models.Model):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    name = SyCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Section Name",
        help_text="Referential Name",
        db_index=True,
    )

    subtitle = SyCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Subheader",
        help_text="Subheader Text",
    )

    title = SyCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )

    description = SyTextField(
        max_length=250,
        null=True,
        blank=True,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description Text",
        min_rows=3,
    )

    alignment = SyCharField(
        max_length=10,
        choices=ALIGNMENT_CHOICES,
        md_column_count=12,
        verbose_name="Text Alignment",
        help_text="Text Alignment",
    )

    show_divider = models.BooleanField(
        default=False,
        verbose_name="Bottom Divider",
        help_text="Optional Divider Below Section Header",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Section Header"
        verbose_name_plural = "Section Headers"


class HighlightedPostsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_highlighted=True)


@metadata(**POSTTAG_METADATA)
class PostTag(models.Model):
    detail = SyCharField(
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
    title = SyCharField(
        max_length=255,
    )
    content = SyTextField()
    author = SyForeignKeyField(
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
        blank=True,
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


@receiver(pre_save, sender=SectionHeader)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
