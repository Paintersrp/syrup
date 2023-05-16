from django.urls import path
from .views import *


urlpatterns = [
    path(
        "posts/",
        PostListCreateView.as_view(),
        name="posts-list",
    ),
    path(
        "tags/",
        TagsView.as_view(),
        name="tags-list",
    ),
    path(
        "tags/<int:pk>/",
        TagsRetrieveUpdateDestroyView.as_view(),
        name="tags-detail-update-delete",
    ),
    path(
        "posts/<int:pk>/",
        PostRetrieveUpdateDestroyView.as_view(),
        name="post-detail-update-delete",
    ),
    path(
        "posts/recent/",
        RecentPostView.as_view(),
        name="recent-posts",
    ),
    path(
        "posts/highlighted/",
        HighlightedPostView.as_view(),
        name="highlighted-posts",
    ),
]
