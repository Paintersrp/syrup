from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from backend.customs import *
from posts.models import Post
from .metadata import *


@metadata(**HERO_HEADER_METADATA)
class HeroHeader(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Hero Block Name",
        help_text="Referential Name",
        db_index=True,
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )

    heading = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Subtitle",
        help_text="Subheader",
        min_rows=3,
    )
    text = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    buttonText = CustomCharField(
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

    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Section Name",
        help_text="Referential Name",
        db_index=True,
    )

    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )

    subtitle = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Subheader",
        help_text="Subheader Text",
    )

    description = CustomTextField(
        max_length=250,
        null=True,
        blank=True,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description Text",
        min_rows=3,
    )

    alignment = CustomCharField(
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


@metadata(**PROCESS_METADATA)
class Process(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=200,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]
        verbose_name = "Process Item"
        verbose_name_plural = "Process Items"


@metadata(**LATEST_NEWS_METADATA)
class LatestPosts(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Latest News Slug",
        help_text="Latest News Slug",
        default="Placeholder",
    )
    latest_posts = models.ManyToManyField(
        Post,
        related_name="latest_posts_highlighted_objects",
    )
    title_block = models.ForeignKey(
        SectionHeader,
        on_delete=models.CASCADE,
        limit_choices_to={"name": "news"},
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Latest News"
        verbose_name_plural = "Latest News"


@receiver(pre_save, sender=SectionHeader)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
