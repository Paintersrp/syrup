from rest_framework import generics
from rest_framework.response import Response
from .models import *
from .serializers import *

from backend.utils import get_serialized_page_data
from backend.custom_views import *


class AboutFullView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "header": {
                "app_label": "about",
                "model_name": "AboutHeader",
                "get_first": True,
            },
            "missionStatement": {
                "app_label": "about",
                "model_name": "MissionStatement",
                "get_first": True,
            },
            "companyHistory": {
                "app_label": "about",
                "model_name": "CompanyHistory",
                "get_first": True,
            },
            "values": {
                "app_label": "about",
                "model_name": "Value",
            },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class AboutHeaderAPIView(BaseListView):
    queryset = AboutHeader.objects.all()
    serializer_class = AboutHeaderSerializer
    model_class = AboutHeader


class AboutHeaderDetailAPIView(BaseDetailView):
    queryset = AboutHeader.objects.all()
    serializer_class = AboutHeaderSerializer
    model_class = AboutHeader


class AboutHeaderBulkAPIView(BaseBulkView):
    queryset = AboutHeader.objects.all()
    serializer_class = AboutHeaderSerializer
    model_class = AboutHeader


class MissionStatementAPIView(BaseListView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer
    model_class = MissionStatement


class MissionStatementDetailAPIView(BaseDetailView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer
    model_class = MissionStatement


class MissionStatementBulkAPIView(BaseBulkView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer
    model_class = MissionStatement


class CompanyHistoryAPIView(BaseListView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class CompanyHistoryDetailAPIView(BaseDetailView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class CompanyHistoryBulkAPIView(BaseBulkView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class ValueAPIView(BaseListView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value


class ValueDetailAPIView(BaseDetailView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value


class ValueBulkAPIView(BaseBulkView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value
