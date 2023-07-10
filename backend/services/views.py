from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from tables.models import *
from tables.serializers import *
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from backend.utils import create_log_entry, return_changes, get_serialized_page_data
from backend.custom_views import *


class ServiceFullTestView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "processText": {
                "app_label": "services",
                "model_name": "ProcessTextItem",
            },
            "processImage": {
                "app_label": "services",
                "model_name": "ProcessImageItem",
            },
            "contactInfo": {
                "app_label": "contact",
                "model_name": "ContactInformation",
                "get_first": True,
            },
            "socials": {
                "app_label": "contact",
                "model_name": "Socials",
                "get_first": True,
            },
            "services": {
                "app_label": "services",
                "model_name": "ServiceTier",
            },
            "servicesTable": {
                "app_label": "tables",
                "model_name": "table",
                "filter": {"name__in": ["Service Comparison Table"]},
            },
            # "competitorsTable": {
            #     "app_label": "tables",
            #     "model_name": "ServiceTable",
            #     "filter": {"name__in": ["Competitors"]},
            # },
            "benefitsHeader": {
                "app_label": "landing",
                "model_name": "SectionHeader",
                "filter": {"name": "benefits"},
            },
            "benefits": {
                "app_label": "services",
                "model_name": "Benefits",
            },
            "quizData": {
                "app_label": "quizes",
                "model_name": "Questionnaire",
            },
            "contentText": {
                "app_label": "services",
                "model_name": "ContentTextBlock",
                "filter": {"slug": "service-individual"},
            },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class BenefitsAPIView(BaseListView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class BenefitsDetailAPIView(BaseDetailView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class BenefitsBulkAPIView(BaseBulkView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class ProcessTextItemAPIView(BaseListView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


class ProcessTextItemDetailAPIView(BaseDetailView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


class ProcessTextItemBulkAPIView(BaseBulkView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


# class ProcessImageItemListView(generics.ListCreateAPIView):
#     queryset = ProcessImageItem.objects.all()
#     serializer_class = ProcessImageItemSerializer

#     def create(self, request, *args, **kwargs):
#         servicetier_name = request.data.get("servicetier")
#         servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

#         process_image = ProcessImageItem.objects.create(
#             servicetier=servicetier,
#             image=request.data.get("image"),
#         )
#         create_log_entry(
#             LogEntry.Action.CREATE,
#             request.username if request.username else None,
#             process_image,
#             None,
#         )
#         serializer = self.get_serializer(process_image)

#         return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProcessImageItemDetailView(SyView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer
    model_class = ProcessImageItem
    fk_fields = ["servicetier"]
    lookup_field = "pk"


# class ProcessImageItemDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ProcessImageItem.objects.all()
#     serializer_class = ProcessImageItemSerializer

#     def update(self, request, *args, **kwargs):
#         print(request.data)
#         instance = self.get_object()
#         old_instance = ProcessImageItem.objects.get(pk=instance.pk)
#         servicetier_name = request.data.get("servicetier")
#         servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

#         if request.FILES.get("image"):
#             image = request.FILES.get("image")
#             instance.image.storage.delete(instance.image.path)
#             instance.image = image
#         else:
#             image = instance.image

#         instance.servicetier = servicetier
#         instance.image = image
#         instance.save()
#         changes = return_changes(instance, old_instance)
#         create_log_entry(
#             LogEntry.Action.UPDATE,
#             request.username if request.username else None,
#             instance,
#             changes,
#         )
#         serializer = self.get_serializer(instance)

#         return Response(serializer.data)


class ProcessImageItemBulkAPIView(BaseBulkView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer
    model_class = ProcessImageItem


class FeatureAPIView(BaseListView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class FeatureDetailAPIView(BaseDetailView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class FeatureBulkAPIView(BaseBulkView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class SupportedSitesAPIView(BaseListView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class SupportedSitesDetailAPIView(BaseDetailView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class SupportedSitesBulkAPIView(BaseBulkView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class ServiceTierView(SyView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer
    model_class = ServiceTier

    lookup_field = "pk"
    mtm_fields = ["features", "supported_sites"]


class ServiceTierBulkAPIView(BaseBulkView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer
    model_class = ServiceTier
