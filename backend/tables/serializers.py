from rest_framework import serializers
from .models import *


class CellSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["value", "column", "row"]

    class Meta:
        model = Cell
        fields = "__all__"


class RowSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True)
    FIELD_KEYS = ["cells"]

    class Meta:
        model = Row
        fields = ("id", "cells", "name")


class ColumnSerializer(serializers.ModelSerializer):
    rows = RowSerializer(many=True, read_only=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = Column
        fields = "__all__"


class TableSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)
    rows = RowSerializer(many=True, read_only=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = Table
        fields = [
            "id",
            "name",
            "columns",
            "rows",
        ]


class TableBuildSerializer(serializers.ModelSerializer):
    columns = serializers.ListField(child=serializers.DictField())
    rows = RowSerializer(many=True, read_only=True)

    class Meta:
        model = Table
        fields = ("name", "columns", "rows")


Table.serializer_class = TableSerializer
Column.serializer_class = ColumnSerializer
Row.serializer_class = RowSerializer
Cell.serializer_class = CellSerializer
