# Generated by Django 4.1.3 on 2023-05-29 19:18

import backend.customs
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("posts", "0001_initial"),
        ("contact", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Feature",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "detail",
                    backend.customs.CustomCharField(
                        help_text="Feature Detail",
                        max_length=100,
                        verbose_name="Feature Detail",
                    ),
                ),
            ],
            options={
                "verbose_name": "Feature",
                "verbose_name_plural": "Features",
            },
        ),
        migrations.CreateModel(
            name="HeroBlock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    backend.customs.CustomCharField(
                        db_index=True,
                        help_text="Referential Name",
                        max_length=100,
                        unique=True,
                        verbose_name="Hero Block Name",
                    ),
                ),
                (
                    "title",
                    backend.customs.CustomCharField(
                        help_text="Header", max_length=200, verbose_name="Title"
                    ),
                ),
                (
                    "heading",
                    backend.customs.CustomTextField(
                        help_text="Subheader", max_length=500, verbose_name="Subtitle"
                    ),
                ),
                (
                    "text",
                    backend.customs.CustomTextField(
                        help_text="Description",
                        max_length=500,
                        verbose_name="Description",
                    ),
                ),
                (
                    "buttonText",
                    backend.customs.CustomCharField(
                        help_text="Button Text",
                        max_length=50,
                        verbose_name="Button Text",
                    ),
                ),
            ],
            options={
                "verbose_name": "Hero Section",
                "verbose_name_plural": "Hero Sections",
                "ordering": ["id"],
            },
        ),
        migrations.CreateModel(
            name="Process",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    backend.customs.CustomCharField(
                        help_text="Header", max_length=100, verbose_name="Title"
                    ),
                ),
                (
                    "description",
                    backend.customs.CustomTextField(
                        help_text="Description",
                        max_length=200,
                        verbose_name="Description",
                    ),
                ),
                (
                    "icon",
                    backend.customs.CustomCharField(
                        help_text="Select Icon", max_length=40, verbose_name="Icon"
                    ),
                ),
            ],
            options={
                "verbose_name": "Process Item",
                "verbose_name_plural": "Process Items",
                "ordering": ["title"],
            },
        ),
        migrations.CreateModel(
            name="SupportedSites",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "detail",
                    backend.customs.CustomCharField(
                        help_text="Supported Site Detail",
                        max_length=100,
                        verbose_name="Supported Site Detail",
                    ),
                ),
            ],
            options={
                "verbose_name": "Supported Sites",
                "verbose_name_plural": "Supported Sites",
            },
        ),
        migrations.CreateModel(
            name="TitleBlock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    backend.customs.CustomCharField(
                        db_index=True,
                        help_text="Referential Name",
                        max_length=100,
                        unique=True,
                        verbose_name="Section Name",
                    ),
                ),
                (
                    "title",
                    backend.customs.CustomCharField(
                        help_text="Header Text", max_length=100, verbose_name="Header"
                    ),
                ),
                (
                    "subtitle",
                    backend.customs.CustomCharField(
                        help_text="Subheader Text",
                        max_length=100,
                        verbose_name="Subheader",
                    ),
                ),
                (
                    "description",
                    backend.customs.CustomTextField(
                        help_text="Description Text",
                        max_length=250,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "alignment",
                    backend.customs.CustomCharField(
                        choices=[
                            ("Left", "Left"),
                            ("Right", "Right"),
                            ("Center", "Center"),
                        ],
                        help_text="Text Alignment",
                        max_length=10,
                        verbose_name="Text Alignment",
                    ),
                ),
                (
                    "show_divider",
                    models.BooleanField(
                        default=False,
                        help_text="Optional Divider Below Section Header",
                        verbose_name="Bottom Divider",
                    ),
                ),
            ],
            options={
                "verbose_name": "Section Headings",
                "verbose_name_plural": "Section Headings",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="ServiceTier",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        help_text="Image",
                        upload_to="pricing_images",
                        verbose_name="Image",
                    ),
                ),
                (
                    "service_title",
                    backend.customs.CustomCharField(
                        db_index=True,
                        help_text="Service Tier Title",
                        max_length=100,
                        verbose_name="Service Title",
                    ),
                ),
                (
                    "price",
                    backend.customs.CustomDecimalField(
                        decimal_places=2,
                        help_text="Service Tier Price",
                        max_digits=10,
                        verbose_name="Price",
                    ),
                ),
                (
                    "paragraph_one",
                    backend.customs.CustomTextField(
                        help_text="Paragraph One",
                        max_length=500,
                        verbose_name="Paragraph One",
                    ),
                ),
                (
                    "paragraph_two",
                    backend.customs.CustomTextField(
                        help_text="Paragraph Two",
                        max_length=500,
                        verbose_name="Paragraph Two",
                    ),
                ),
                (
                    "paragraph_three",
                    backend.customs.CustomTextField(
                        help_text="Paragraph Three",
                        max_length=500,
                        verbose_name="Paragraph Three",
                    ),
                ),
                (
                    "features",
                    backend.customs.CustomManyToManyField(
                        help_text="Service Tier Features",
                        related_name="features",
                        to="landing.feature",
                        verbose_name="Features",
                    ),
                ),
                (
                    "supported_sites",
                    backend.customs.CustomManyToManyField(
                        help_text="Service Tier Supported Sites",
                        related_name="supportedsites",
                        to="landing.supportedsites",
                        verbose_name="Supported Sites",
                    ),
                ),
            ],
            options={
                "verbose_name": "Service Tiers",
                "verbose_name_plural": "Service Tiers",
                "ordering": ["price"],
            },
        ),
        migrations.CreateModel(
            name="Processes",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    backend.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Hero Name",
                        max_length=20,
                        verbose_name="Hero Name",
                    ),
                ),
                ("processes", models.ManyToManyField(to="landing.process")),
                (
                    "title_block",
                    models.ForeignKey(
                        limit_choices_to={"name": "process"},
                        on_delete=django.db.models.deletion.CASCADE,
                        to="landing.titleblock",
                    ),
                ),
            ],
            options={
                "verbose_name": "Process Component Set",
                "verbose_name_plural": "Process Component Sets",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="LatestNews",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    backend.customs.CustomCharField(
                        default="Placeholder",
                        help_text="Latest News Slug",
                        max_length=20,
                        verbose_name="Latest News Slug",
                    ),
                ),
                (
                    "latest_posts",
                    models.ManyToManyField(
                        related_name="latest_posts_highlighted_objects", to="posts.post"
                    ),
                ),
                (
                    "title_block",
                    models.ForeignKey(
                        limit_choices_to={"name": "news"},
                        on_delete=django.db.models.deletion.CASCADE,
                        to="landing.titleblock",
                    ),
                ),
            ],
            options={
                "verbose_name": "Latest News",
                "verbose_name_plural": "Latest News",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Hero",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    backend.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Hero Name",
                        max_length=20,
                        verbose_name="Hero Name",
                    ),
                ),
                (
                    "contact",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contact.contactinformation",
                        verbose_name="Contact Information",
                    ),
                ),
                (
                    "hero_block",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="landing.heroblock",
                        verbose_name="Attached Hero Block Data",
                    ),
                ),
                (
                    "social",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contact.socials",
                        verbose_name="Socials",
                    ),
                ),
            ],
            options={
                "verbose_name": "Hero",
                "verbose_name_plural": "Heros",
                "ordering": ["name"],
            },
        ),
    ]