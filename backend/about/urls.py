from django.urls import path
from .views import *

urlpatterns = [
    path(
        "value/",
        ValueAPIView.as_view(),
        name="value-list",
    ),
    path(
        "value/<int:pk>/",
        ValueDetailAPIView.as_view(),
        name="value-detail",
    ),
    path(
        "value/bulk/",
        ValueBulkAPIView.as_view(),
        name="value-bulk-detail",
    ),
    path(
        "aboutblock/",
        AboutBlockAPIView.as_view(),
        name="aboutblock-list",
    ),
    path(
        "aboutblock/<int:pk>/",
        AboutBlockDetailAPIView.as_view(),
        name="aboutblock-detail",
    ),
    path(
        "aboutblock/bulk/",
        AboutBlockBulkAPIView.as_view(),
        name="aboutblock-bulk-detail",
    ),
    path(
        "missionstatement/",
        MissionStatementAPIView.as_view(),
        name="missionstatement-list",
    ),
    path(
        "missionstatement/<int:pk>/",
        MissionStatementDetailAPIView.as_view(),
        name="missionstatement-update",
    ),
    path(
        "missionstatement/bulk/",
        MissionStatementBulkAPIView.as_view(),
        name="missionstatement-bulk-detail",
    ),
    path(
        "companyhistory/",
        CompanyHistoryAPIView.as_view(),
        name="companyhistory-list",
    ),
    path(
        "companyhistory/<int:pk>/",
        CompanyHistoryDetailAPIView.as_view(),
        name="companyhistory-update",
    ),
    path(
        "companyhistory/bulk/",
        CompanyHistoryBulkAPIView.as_view(),
        name="companyhistory-bulk-detail",
    ),
    # path(
    #     "about/",
    #     AboutFullView.as_view(),
    #     name="about-full",
    # ),
]
