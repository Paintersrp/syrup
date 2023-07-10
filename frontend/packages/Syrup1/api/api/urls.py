from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = (
    [
        path(
            "api/get_metadata/<str:model_name>/",
            views.ModelMetadataAPIView.as_view(),
            name="get_metadata",
        ),
        path(
            "api/get_models/",
            views.ModelEndpointAPIView.as_view(),
            name="get_models",
        ),
        path(
            "api/get_models/<str:model_name>/",
            views.SingleModelAPIView.as_view(),
            name="get_model_metadata",
        ),
        path(
            "api/get_app/<str:app_name>/",
            views.SingleAppEndpointAPIView.as_view(),
            name="get_model_metadata",
        ),
        path(
            "api/recent_admin_actions/",
            views.RecentAdminActionsView.as_view(),
            name="recent_admin_actions",
        ),
        path(
            "admin/",
            admin.site.urls,
        ),
        path(
            "api/auth/",
            include("authorization.urls"),
        ),
        path(
            "api/",
            include("home.urls"),
        ),
    ]
    + static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
    + static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT,
    )
)
