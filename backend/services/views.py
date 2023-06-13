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
            "ProcessTextItem": {
                "app_label": "services",
                "model_name": "ProcessTextItem",
            },
            "ProcessImageItem": {
                "app_label": "services",
                "model_name": "ProcessImageItem",
            },
            "ContactInformation": {
                "app_label": "contact",
                "model_name": "ContactInformation",
                "get_first": True,
            },
            "Socials": {
                "app_label": "contact",
                "model_name": "Socials",
                "get_first": True,
            },
            "services": {
                "app_label": "services",
                "model_name": "ServiceTier",
            },
            # "servicesTable": {
            #     "app_label": "tables",
            #     "model_name": "ServiceTable",
            #     "filter": {"name__in": ["Tiers"]},
            # },
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


class ProcessImageItemListView(generics.ListCreateAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def create(self, request, *args, **kwargs):
        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        process_image = ProcessImageItem.objects.create(
            servicetier=servicetier,
            image=request.data.get("image"),
        )
        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            process_image,
            None,
        )
        serializer = self.get_serializer(process_image)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProcessImageItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        instance = self.get_object()
        old_instance = ProcessImageItem.objects.get(pk=instance.pk)
        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            instance.image.storage.delete(instance.image.path)
            instance.image = image
        else:
            image = instance.image

        instance.servicetier = servicetier
        instance.image = image
        instance.save()
        changes = return_changes(instance, old_instance)
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )
        serializer = self.get_serializer(instance)

        return Response(serializer.data)


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


class ServiceTierView(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView
):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer

    def create(self, request, *args, **kwargs):
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("service_title")
        price = formatted_data.get("price")

        feature_list = formatted_data.get("features", [])
        supported_sites_list = formatted_data.get("supported_sites", [])

        feature_objs = []
        for feature in feature_list:
            feature_obj, created = Feature.objects.get_or_create(detail=feature)
            feature_objs.append(feature_obj)

        supported_sites_objs = []
        for supported_site in supported_sites_list:
            supported_site_obj, created = SupportedSites.objects.get_or_create(
                detail=supported_site
            )
            supported_sites_objs.append(supported_site_obj)

        pricing_plan = ServiceTier.objects.create(
            service_title=title,
            price=price,
            image=formatted_data.get("image"),
            paragraph_one=formatted_data.get("paragraph_one"),
            paragraph_two=formatted_data.get("paragraph_two"),
            paragraph_three=formatted_data.get("paragraph_three"),
        )
        pricing_plan.features.set(feature_objs)
        pricing_plan.supported_sites.set(supported_sites_objs)
        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            pricing_plan,
            None,
        )

        serializer = self.get_serializer(pricing_plan)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ServiceTierDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ServiceTier.objects.get(pk=instance.pk)
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("service_title", instance.service_title)
        price = formatted_data.get("price", instance.price)

        feature_list = formatted_data.get("features", [])
        supported_sites_list = formatted_data.get("supported_sites", [])

        feature_objs = []
        for feature in feature_list:
            feature_obj, created = Feature.objects.get_or_create(detail=feature)
            feature_objs.append(feature_obj)

        supported_sites_objs = []
        for supported_site in supported_sites_list:
            supported_site_obj, created = SupportedSites.objects.get_or_create(
                detail=supported_site
            )
            supported_sites_objs.append(supported_site_obj)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            instance.image.storage.delete(instance.image.path)
            instance.image = image
        else:
            image = instance.image

        instance.service_title = title
        instance.price = price
        instance.image = image
        instance.paragraph_one = formatted_data.get(
            "paragraph_one", instance.paragraph_one
        )
        instance.paragraph_two = formatted_data.get(
            "paragraph_two", instance.paragraph_two
        )
        instance.paragraph_three = formatted_data.get(
            "paragraph_three", instance.paragraph_three
        )
        instance.save()
        instance.features.set(feature_objs)
        instance.supported_sites.set(supported_sites_objs)
        serializer = self.get_serializer(instance)

        changes = return_changes(instance, old_instance)
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class ServiceTierBulkAPIView(BaseBulkView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer
    model_class = ServiceTier
