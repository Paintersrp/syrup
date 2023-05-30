from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import *
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class CustomHeroBlockAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "description", "buttonText")


class CustomProcessAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "icon")


class CustomTitleBlockAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "subtitle", "alignment", "show_divider")
    list_filter = ("alignment", "show_divider")
    search_fields = ("name", "title", "subtitle")


admin.site.register(LatestPosts)
admin.site.register(SectionHeader, CustomTitleBlockAdmin)
admin.site.register(Process, CustomProcessAdmin)
admin.site.register(HeroHeader, CustomHeroBlockAdmin)
