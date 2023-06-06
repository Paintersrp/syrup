from django.db import models
from backend.customs import *
from .models import *
from .metadata import *


@metadata(**FEATURE_METADATA)
class Feature(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Feature Detail",
        help_text="Feature Detail",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Feature"
        verbose_name_plural = verbose_name + "s"


@metadata(**SUPPORTED_SITES_METADATA)
class SupportedSites(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Supported Site Detail",
        help_text="Supported Site Detail",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Supported Sites"
        verbose_name_plural = "Supported Sites"


@metadata(**SERVICE_TIER_METADATA)
class ServiceTier(models.Model):
    image = models.ImageField(
        upload_to="pricing_images",
        verbose_name="Image",
        help_text="Image",
    )

    service_title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Service Title",
        help_text="Service Tier Title",
        db_index=True,
    )
    price = CustomDecimalField(
        max_digits=10,
        decimal_places=2,
        md_column_count=6,
        verbose_name="Price",
        help_text="Service Tier Price",
    )

    features = CustomManyToManyField(
        Feature,
        related_name="features",
        verbose_name="Features",
        md_column_count=6,
        help_text="Service Tier Features",
        blank=True,
    )

    supported_sites = CustomManyToManyField(
        SupportedSites,
        related_name="supportedsites",
        verbose_name="Supported Sites",
        md_column_count=6,
        help_text="Service Tier Supported Sites",
        blank=True,
    )

    paragraph_one = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph One",
        help_text="Paragraph One",
    )
    paragraph_two = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph Two",
        help_text="Paragraph Two",
    )
    paragraph_three = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph Three",
        help_text="Paragraph Three",
    )

    def __str__(self):
        return self.service_title

    def delete(self, *args, **kwargs):
        self.features.all().delete()
        self.supported_sites.all().delete()
        super().delete(*args, **kwargs)

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.features.xs_column_count = 12
    #     self.features.md_column_count = 8

    class Meta:
        ordering = ["price"]
        verbose_name = "Service Tiers"
        verbose_name_plural = "Service Tiers"


@metadata(**BENEFITS_METADATA)
class Benefits(BaseModel):
    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )
    description = CustomTextField(
        max_length=250,
        verbose_name="Description",
        md_column_count=12,
        help_text="Content Text",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )
    buttonText = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Button Text",
    )
    page_link = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Link",
        help_text="Page Link",
        default="about",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Benefits"
        verbose_name_plural = "Benefits"


@metadata(**PROCESS_IMAGE_ITEM_METADATA)
class ProcessImageItem(models.Model):
    image = models.ImageField(
        upload_to="process_images",
        verbose_name="Image",
    )
    servicetier = models.ForeignKey(
        ServiceTier,
        on_delete=models.CASCADE,
        related_name="servicetier",
        null=True,
        verbose_name="Service Tier",
        help_text="Service Tier Link",
    )

    def __str__(self):
        return self.servicetier.service_title

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


@metadata(**PROCESS_TEXT_ITEM_METADATA)
class ProcessTextItem(models.Model):
    title = CustomCharField(
        max_length=100,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]
        verbose_name = "Process Text Item"
        verbose_name_plural = "Process Text Items"
