from django.db import models
from backend.customs import *
from .metadata import *


@metadata(**TABLE_METADATA)
class Table(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Table Name",
        help_text="Table Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Table"
        verbose_name_plural = "Tables"


@metadata(**COLUMN_METADATA)
class Column(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Column Name",
        help_text="Column Name",
        md_column_count=6,
        db_index=True,
    )
    table = CustomForeignKeyField(
        Table,
        on_delete=models.CASCADE,
        related_name="columns",
        verbose_name="Table",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Column"
        verbose_name_plural = "Columns"


@metadata(**ROW_METADATA)
class Row(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Row Name",
        help_text="Row Name",
        md_column_count=6,
        db_index=True,
        null=True,
        blank=True,
    )
    table = CustomForeignKeyField(
        Table,
        on_delete=models.CASCADE,
        related_name="rows",
        verbose_name="Table",
    )

    def __str__(self):
        return f"Row {self.id}"

    class Meta:
        ordering = ["id"]
        verbose_name = "Row"
        verbose_name_plural = "Rows"


@metadata(**CELL_METADATA)
class Cell(models.Model):
    value = CustomCharField(
        max_length=255,
        verbose_name="Cell Value",
        help_text="Cell Value",
        md_column_count=6,
        db_index=True,
    )
    column = CustomForeignKeyField(
        Column,
        on_delete=models.CASCADE,
        related_name="cells",
        verbose_name="Column",
    )
    row = CustomForeignKeyField(
        Row,
        on_delete=models.CASCADE,
        related_name="cells",
        verbose_name="Row",
    )

    def __str__(self):
        return self.value

    class Meta:
        ordering = ["id"]
        verbose_name = "Cell"
        verbose_name_plural = "Cells"
