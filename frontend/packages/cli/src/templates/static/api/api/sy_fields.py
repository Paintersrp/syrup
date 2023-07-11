from django.db import models


def metadata(
    autoform_label=None,
    long_description=None,
    short_description=None,
    pages_associated=None,
    include_preview=False,
    icon=None,
    icon_class=None,
    slug=None,
    tags=None,
    related_components=None,
    visibility=True,
    access_level="All",
    info_dump={"text": ""},
    filter_options=["id"],
    filter_choices=[],
    allowed=False,
    category="None",
):
    def decorator(cls):
        cls._meta.autoform_label = autoform_label
        cls._meta.long_description = long_description
        cls._meta.short_description = short_description
        cls._meta.pages_associated = pages_associated
        cls._meta.include_preview = include_preview
        cls._meta.icon = icon
        cls._meta.icon_class = icon_class
        cls._meta.slug = slug
        cls._meta.tags = tags
        cls._meta.related_components = related_components
        cls._meta.visibility = visibility
        cls._meta.access_level = access_level
        cls._meta.info_dump = info_dump
        cls._meta.filter_options = filter_options
        cls._meta.filter_choices = filter_choices
        cls._meta.allowed = allowed
        cls._meta.category = category
        return cls

    return decorator


class SyBaseField(models.Field):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class SyBooleanField(SyBaseField, models.BooleanField):
    pass


class SyCharField(SyBaseField, models.CharField):
    pass


class SyDecimalField(SyBaseField, models.DecimalField):
    pass


class SyEmailField(SyBaseField, models.EmailField):
    pass


class SyForeignKeyField(SyBaseField, models.ForeignKey):
    pass


class SyImageField(SyBaseField, models.ImageField):
    def __init__(self, *args, **kwargs):
        self.verbose_name = kwargs.pop("verbose_name", "Image")
        self.help_text = kwargs.pop("help_text", "Image")
        super().__init__(*args, **kwargs)


class SyJSONField(SyBaseField, models.JSONField):
    pass


class SyManyToManyField(SyBaseField, models.ManyToManyField):
    pass


class SyPositiveIntegerField(SyBaseField, models.PositiveIntegerField):
    pass


class SySlugField(SyBaseField, models.SlugField):
    pass


class SyTextField(SyBaseField, models.TextField):
    def __init__(self, *args, **kwargs):
        self.markdown = kwargs.pop("markdown", False)
        self.min_rows = kwargs.pop("min_rows", 6)
        super().__init__(*args, **kwargs)


class SyURLField(SyBaseField, models.URLField):
    pass
