from django.apps import AppConfig


class ServicesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "services"
    verbose_name = "Services"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Service Tier Creator (WIP)": "/wip",
        "Service Admin Log": "/adminlog",
    }
