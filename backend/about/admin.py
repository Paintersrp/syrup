from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import *


# Register your models here.
class CustomAboutBlockAdmin(admin.ModelAdmin):
    list_display = ("title", "image", "thumbnail_tag")
    search_fields = ("buttonText", "buttonLink")

    def thumbnail_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="75" height="50"/>'.format(obj.image.url)
            )
        return "-"

    thumbnail_tag.short_description = "Thumbnail"


admin.site.register(Value)
admin.site.register(CompanyHistory)
admin.site.register(MissionStatement)
admin.site.register(AboutHeader, CustomAboutBlockAdmin)
