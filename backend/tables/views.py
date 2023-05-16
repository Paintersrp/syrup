from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from backend.custom_views import *


class TableAPIView(BaseListView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class TableDetailAPIView(BaseDetailView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class TableBulkAPIView(BaseBulkView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class ColumnAPIView(BaseListView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class ColumnDetailAPIView(BaseDetailView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class ColumnBulkAPIView(BaseBulkView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class RowAPIView(BaseListView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class RowDetailAPIView(BaseDetailView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class RowBulkAPIView(BaseBulkView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class CellAPIView(BaseListView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class CellDetailAPIView(BaseDetailView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class CellBulkAPIView(BaseBulkView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class TableBuilder(generics.CreateAPIView):
    serializer_class = TableBuildSerializer
    model_class = Table

    def validate_data(self, data):
        errors = set()

        if "columns" not in data or not data["columns"]:
            errors.add("At least one column is required")

        for column_data in data.get("columns", []):
            if not column_data.get("name"):
                errors.add("Column name is required")
            elif len(column_data["name"]) > 255:
                errors.add("Column name must be at most 255 characters long")
            elif column_data["name"].strip() == "":
                errors.add("Column name cannot be empty")

            if "rows" not in column_data or not column_data["rows"]:
                errors.add("At least one row is required in each column")

            for row_data in column_data.get("rows", []):
                if "cells" not in row_data or not row_data["cells"]:
                    errors.add("At least one cell is required")

                if not row_data.get("name"):
                    errors.add("Row name is required")
                elif len(row_data["name"]) > 255:
                    errors.add("Row name must be at most 255 characters long")
                elif row_data["name"].strip() == "":
                    errors.add("Row name cannot be empty")

                if "cells" not in row_data or not row_data["cells"]:
                    errors.add("At least one cell is required")

                for cell_data in row_data.get("cells", []):
                    if not cell_data.get("value"):
                        errors.add("Cell value is required")
                    elif len(cell_data["value"]) > 255:
                        errors.add("Cell value must be at most 255 characters long")
                    elif cell_data["value"].strip() == "":
                        errors.add("Cell value cannot be empty")

        if not data.get("name"):
            errors.add("Table name is required")
        elif len(data["name"]) > 255:
            errors.add("Table name must be at most 255 characters long")
        elif data["name"].strip() == "":
            errors.add("Table name cannot be empty")

        if errors:
            raise serializers.ValidationError(list(errors))

        return data

    def post(self, request, *args, **kwargs):
        data = self.validate_data(request.data)
        columns_data = data.pop("columns")
        table = Table(**data)
        table.save()

        created_rows = {}
        for column_data in columns_data:
            rows = column_data.pop("rows", [])
            column = Column.objects.create(table=table, **column_data)

            for row_data in rows:
                row_name = row_data.pop("name")
                cells_data = row_data.pop("cells", [])

                if row_name in created_rows:
                    row = created_rows[row_name]
                else:
                    row = Row.objects.create(table=table, name=row_name)
                    created_rows[row_name] = row

                for cell_data in cells_data:
                    cell = Cell.objects.create(column=column, row=row, **cell_data)

        table = Table.objects.get(id=table.id)

        serializer = TableSerializer(instance=table, data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
