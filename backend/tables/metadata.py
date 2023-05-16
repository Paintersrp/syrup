TABLE_METADATA = {
    "autoform_label": "Table",
    "long_description": "This model represents a table.",
    "short_description": "Model for tables",
    "pages_associated": {
        "Tables": "/tables",
    },
    "include_preview": True,
    "icon": "TableIcon",
    "icon_class": None,
    "slug": "tables",
    "tags": ["Tables"],
    "related_components": ["TableList", "TableDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a table.",
        "fields": {
            "Table Name": "The name of the table.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Table model reference": "/docs/table/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


COLUMN_METADATA = {
    "autoform_label": "Column",
    "long_description": "This model represents a column in a database table.",
    "short_description": "Model for database columns",
    "pages_associated": {
        "Tables": "/tables",
        "Columns": "/columns",
    },
    "include_preview": True,
    "icon": "ColumnIcon",
    "icon_class": None,
    "slug": "columns",
    "tags": ["Tables", "Columns"],
    "related_components": ["ColumnList", "ColumnDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a column in a database table.",
        "fields": {
            "Column Name": "The name of the column.",
            "Table": "The table to which the column belongs.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Column model reference": "/docs/column/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


ROW_METADATA = {
    "autoform_label": "Row",
    "long_description": "This model represents a row in a table.",
    "short_description": "Model for table rows",
    "pages_associated": {
        "Tables": "/tables",
        "Rows": "/rows",
    },
    "include_preview": False,
    "icon": "RowIcon",
    "icon_class": None,
    "slug": "table-rows",
    "tags": ["Tables", "Rows"],
    "related_components": ["RowList", "RowDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a row in a table.",
        "fields": {
            "Row Name": "The name of the row.",
            "Table": "The table to which the row belongs.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Row model reference": "/docs/row/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


CELL_METADATA = {
    "autoform_label": "Cell",
    "long_description": "This model represents a cell in a table.",
    "short_description": "Model for table cells",
    "pages_associated": {
        "Tables": "/tables",
        "Columns": "/columns",
        "Rows": "/rows",
    },
    "include_preview": True,
    "icon": "TableCellIcon",
    "icon_class": None,
    "slug": "table-cells",
    "tags": ["Tables", "Cells"],
    "related_components": ["TableCellList", "TableCellDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a cell in a table.",
        "fields": {
            "Value": "The value of the cell.",
            "Column": "The column the cell belongs to.",
            "Row": "The row the cell belongs to.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "TableCell model reference": "/docs/tablecell/",
        },
    },
    "allowed": True,
    "filter_options": ["value"],
}
