HERO_HEADER_METADATA = {
    "autoform_label": "Hero Section",
    "long_description": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
    "short_description": "A model for creating hero sections.",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": True,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "hero",
    "tags": ["Landing", "Hero", "Company"],
    "related_components": ["Hero"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": True,
}


SECTION_HEADER_METADATA = {
    "autoform_label": "Section Heading",
    "long_description": "A section heading with a title, subtitle, and description to be used as a heading for various content sections.",
    "short_description": "Section Heading",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "TitleIcon",
    "icon_class": None,
    "slug": "section-title",
    "tags": ["About", "Title", "Content", "Company"],
    "related_components": ["TitleBlock"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a section heading with a title, subtitle, and description to be used as a heading for various content sections.",
        "fields": {
            "Name": "A unique name for the section heading.",
            "Header Text": "The main heading text of the section heading.",
            "Subheader Text": "The subheading text of the section heading.",
            "Description": "A brief description of the section heading.",
            "Alignment": "The alignment of the section heading (left, right, or center).",
            "Show Divider": "Whether to show a divider line under the section heading or not.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "TitleBlock model reference": "/docs/model/titleblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "filter_options": [
        "name",
        "title",
        "id",
    ],
    "allowed": True,
}


POSTTAG_METADATA = {
    "autoform_label": "TitleBlock",
    "long_description": "Description Placeholder",
    "short_description": "Short Description",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "StyleIcon",
    "icon_class": None,
    "slug": "header",
    "tags": ["About", "Header", "Company"],
    "related_components": ["Header"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "Position": "The title of the job.",
            "Location": "The location of the job.",
            "Type": "The type of job (e.g. full-time, part-time).",
            "Tagline": "A short description of the job.",
            "Who We Are": "A description of the company and its values.",
            "Requirements": "The requirements for the job.",
            "Responsibilities": "The responsibilities of the job.",
            "Looking For": "A description of the ideal candidate for the job.",
            "Why Apply": "A description of the benefits of working for the company.",
            "Filled": "Whether or not the job has been filled.",
            "Created At (auto-generated)": "The date and time the job posting was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/docs/jobposting/",
        },
    },
    "filter_options": ["detail"],
    "allowed": False,
}


POST_METADATA = {
    "autoform_label": "TitleBlock",
    "long_description": "Description Placeholder",
    "short_description": "Short Description",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "NewspaperIcon",
    "icon_class": None,
    "slug": "header",
    "tags": ["About", "Header", "Company"],
    "related_components": ["Header"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "Position": "The title of the job.",
            "Location": "The location of the job.",
            "Type": "The type of job (e.g. full-time, part-time).",
            "Tagline": "A short description of the job.",
            "Who We Are": "A description of the company and its values.",
            "Requirements": "The requirements for the job.",
            "Responsibilities": "The responsibilities of the job.",
            "Looking For": "A description of the ideal candidate for the job.",
            "Why Apply": "A description of the benefits of working for the company.",
            "Filled": "Whether or not the job has been filled.",
            "Created At (auto-generated)": "The date and time the job posting was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/docs/jobposting/",
        },
    },
    "filter_options": [
        "title",
        "is_highlighted",
    ],
    "allowed": False,
}
