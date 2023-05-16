from django.apps import AppConfig


class PostsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "posts"
    verbose_name = "Posts"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Posts Page": "/posts",
        "Post Creator (WIP)": "/wip",
        "Post Admin Log": "/adminlog",
    }
