from django.db import models
from .metadata import *
from backend.customs import *


@metadata(**ABOUT_HEADER_METADATA)
class AboutHeader(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Referential Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Company Name",
    )
    image = CustomImageFieldField(
        upload_to="about",
        verbose_name="Image",
        help_text="Header Image",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "About Header"
        verbose_name_plural = verbose_name + "s"


@metadata(**MISSION_STATEMENT_METADATA)
class MissionStatement(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Mission Statement Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        justify="center",
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Mission Statement Body",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


@metadata(**COMPANY_HISTORY_METADATA)
class CompanyHistory(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Company History Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Company History Body",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Company History"
        verbose_name_plural = verbose_name + "s"


@metadata(**VALUE_METADATA)
class Value(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Title",
        help_text="Value Title",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Value Icon",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"
