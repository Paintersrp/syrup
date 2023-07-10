from django.urls import path
from .views import *


urlpatterns = [
    #
    #       General
    #
    path(
        "home/",
        HomeFullTestView.as_view(),
        name="home-full",
    ),
    #
    #       Hero Header
    #
    path(
        "heroheader/main/",
        HeroHeaderMainAPIView.as_view(),
        name="heroheader-single",
    ),
    path(
        "heroheader/",
        HeroHeaderView.as_view(),
        name="heroheader-list",
    ),
    path(
        "heroheader/<int:pk>/",
        HeroHeaderView.as_view(),
        name="heroheader-detail",
    ),
    path(
        "heroheader/bulk/",
        HeroHeaderBulkAPIView.as_view(),
        name="heroheader-bulk-detail",
    ),
    #
    #       Section Header
    #
    path(
        "sectionheader/",
        SectionHeaderAPIView.as_view(),
        name="sectionheader-list",
    ),
    path(
        "sectionheader/<int:pk>/",
        SectionHeaderUpdateAPIView.as_view(),
        name="sectionheader-update",
    ),
    path(
        "sectionheader/<str:name>/",
        SectionHeaderDetailAPIView.as_view(),
        name="sectionheader-search",
    ),
    path(
        "sectionheader/del/bulk/",
        SectionHeaderBulkAPIView.as_view(),
        name="sectionheader-bulk-detail",
    ),
    #
    #       Tags
    #
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
    #
    #       Posts
    #
    path(
        "post/",
        PostListCreateView.as_view(),
        name="posts-list",
    ),
    path(
        "post/<int:pk>/",
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
