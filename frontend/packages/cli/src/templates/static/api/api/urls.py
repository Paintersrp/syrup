from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = (
    [
        path(
            "admin/<int:content_type_id>/<int:object_id>/",
            views.custom_admin_url_return,
            name="custom_admin_url_return",
        ),
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
            "api/get_contenttype_info/<int:content_id>/",
            views.ContentTypeEndpointAPIView.as_view(),
            name="get_contenttype_info",
        ),
        path(
            "api/user/",
            views.UserListView.as_view(),
            name="user-list",
        ),
        path(
            "api/recent_admin_actions/",
            views.RecentAdminActionsView.as_view(),
            name="recent_admin_actions",
        ),
        path(
            "api/preview-data/",
            views.component_preview_data,
            name="component_preview_data",
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
