FEATURE_METADATA = {
    "autoform_label": "Service Tier Feature",
    "long_description": "This model holds a list of features offered by a Service/Service Tier",
    "short_description": "Features offered by a Service/Service Tier",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "StarIcon",
    "icon_class": None,
    "slug": "service-feature",
    "tags": ["Feature", "Service", "Tier"],
    "related_components": ["Pricing"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the features offered by a Service or Service Tier. Each instance of this model contains information about a single feature.",
        "fields": {
            "Detail": "A short description of the feature.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Feature model reference": "/docs/model/feature/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "allowed": False,
}


SUPPORTED_SITES_METADATA = {
    "autoform_label": "Service Tier Supported Site",
    "long_description": "This model holds a list of supported sites offered by a Service/Service Tier",
    "short_description": "Site types supported by a Service/Service Tier",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "WebIcon",
    "icon_class": None,
    "slug": "service-supported-site",
    "tags": ["Feature", "Service", "Tier"],
    "related_components": ["Pricing"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model holds a list of supported sites offered by a Service/Service Tier.",
        "fields": {
            "Detail": "The name of the supported site.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "SupportedSites model reference": "/docs/model/supportedsites/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "allowed": False,
}


SERVICE_TIER_METADATA = {
    "autoform_label": "Service Tier",
    "long_description": "This model represents the different service tiers available.",
    "short_description": "Service Tier Model",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "DesignServicesIcon",
    "icon_class": None,
    "slug": "service-tier",
    "tags": ["Pricing", "Service", "Tier"],
    "related_components": ["Pricing", "ServiceIndividual"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model defines the different service tiers that are available in our system, including the pricing, features, and supported sites for each tier.",
        "fields": {
            "Image": "The image associated with the service tier.",
            "Service Title": "The title of the service tier.",
            "Price": "The price of the service tier.",
            "Paragraph One": "The first paragraph of the service tier description.",
            "Paragraph Two": "The second paragraph of the service tier description.",
            "Paragraph Three": "The third paragraph of the service tier description.",
            "Features": "The features included in the service tier.",
            "Supported Sites": "The sites that are supported by the service tier.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTier model reference": "/docs/model/servicetier/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "filter_options": [
        "service_title",
        "id",
    ],
    "allowed": True,
}


BENEFITS_METADATA = {
    "autoform_label": "Benefit",
    "long_description": "This model represents the benefits offered by your company to your customers. Each benefit has a header, description, icon, button text, and a link to a page.",
    "short_description": "Model for benefits offered by our company",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "ViewListIcon",
    "icon_class": None,
    "slug": "service-benefits",
    "tags": ["Benefits", "Services", "Company"],
    "related_components": ["Benefits", "Benefit"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the benefits offered by your company to your customers for a particular service tier.",
        "fields": {
            "Icon": "The name of the icon used to represent the benefit",
            "Header Text": "The header text of the benefit",
            "Page Link": "The page link to the content represented by the benefit",
            "Content Text": "A brief description of the benefit",
            "Button Text": "The text to display on the button that links to the benefit page",
        },
        "model_links": {
            "Creating a Benefits object": "https://docs.example.com/create-benefits-object",
            "Updating a Benefits object": "https://docs.example.com/update-benefits-object",
            "Deleting a Benefits object": "https://docs.example.com/delete-benefits-object",
        },
    },
    "filter_options": [
        "title",
        "id",
    ],
    "allowed": True,
}


PROCESS_IMAGE_ITEM_METADATA = {
    "autoform_label": "Process Image Item",
    "long_description": "This model represents an image used in the process of providing our services. Each image is associated with a service tier.",
    "short_description": "A model for process images",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "ImageIcon",
    "icon_class": None,
    "slug": "process-image-item",
    "tags": ["Service", "Image"],
    "related_components": ["ProcessImage"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents an image used in the process of providing our services, and is associated with a specific service tier.",
        "fields": {
            "Image": "The image file.",
            "Service Tier": "The service tier that this image is associated with.",
        },
        "model_links": {
            "Creating a ProcessImageItem object": "https://docs.example.com/create-processimageitem-object",
            "Updating a ProcessImageItem object": "https://docs.example.com/update-processimageitem-object",
            "Deleting a ProcessImageItem object": "https://docs.example.com/delete-processimageitem-object",
        },
    },
    "filter_options": [
        "servicetier",
        "id",
    ],
    "allowed": False,
}


PROCESS_TEXT_ITEM_METADATA = {
    "autoform_label": "Process Text Item",
    "long_description": "This model represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
    "short_description": "A text item in a process or workflow.",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "Description",
    "icon_class": None,
    "slug": "process-text-item",
    "tags": ["Service", "Text"],
    "related_components": ["ProcessText"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "Represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
        "fields": {
            "Title": "The title of the text item. Limited to 100 characters.",
            "Description": "The description of the text item. Limited to 500 characters.",
            "Icon": "The icon associated with the text item. Limited to 40 characters.",
        },
        "model_links": {
            "Creating a ProcessTextItem object": "https://docs.example.com/create-processtextitem-object",
            "Updating a ProcessTextItem object": "https://docs.example.com/update-processtextitem-object",
            "Deleting a ProcessTextItem object": "https://docs.example.com/delete-processtextitem-object",
        },
    },
    "filter_options": [
        "title",
        "id",
    ],
    "allowed": True,
}


QUIZ_METADATA = {
    "autoform_label": "Quiz",
    "long_description": "A quiz to help users determine which service tier is best for them.",
    "short_description": "quiz",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "Description",
    "icon_class": None,
    "slug": "service-quiz",
    "tags": ["quiz", "service"],
    "related_components": ["Questionnaire"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a quiz designed to help users determine which service tier is best for them.",
        "fields": {
            "name": "The name of the quiz",
            "service_tiers": "The service tiers that are available for the user to choose from",
            "benefits": "The benefits associated with each service tier",
            "title_block": "The title block to display at the top of the quiz",
            "tiers_table": "The service tier comparison table to display in the quiz",
            "competitors_table": "The competitor comparison table to display in the quiz",
            "questionnaire": "The questionnaire associated with the quiz",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Quiz model reference": "/docs/model/quiz/",
            "Questionnaire model reference": "/docs/model/questionnaire/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "filter_options": ["name"],
    "allowed": False,
}

CONTENT_TEXT_BLOCK_METADATA = {
    "autoform_label": "Content Text Block",
    "long_description": "This model represents a content text block used to display a header or a description in the hero section of various pages.",
    "short_description": "Content Text Block",
    "pages_associated": {
        "Landing": "/",
        "About": "/about",
        "Services": "/services",
        "Contact": "/contact",
        "News": "/news",
    },
    "include_preview": True,
    "icon": "TitleIcon",
    "icon_class": None,
    "slug": "content-text-block",
    "tags": ["About", "Header", "Company"],
    "related_components": ["ServiceProcess"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a content text block used to display a header or a description in the hero section of various pages.",
        "fields": {
            "Slug (Identifier)": "The slug field is used to identify the content text block.",
            "Header": "The title field is used to display the top header of the hero section.",
            "Description": "The description field is used to display the description of the hero section.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ContentTextBlock model reference": "/docs/model/contenttextblock/",
            "General app documentation": "/docs/app/general/",
        },
    },
    "filter_options": ["slug"],
    "allowed": True,
}
