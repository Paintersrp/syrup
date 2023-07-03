export const ModelViewsTemplate = (modelName) =>
  `
class ${modelName}BulkAPIView(BaseBulkView):
  queryset = ${modelName}.objects.all()
  serializer_class = ${modelName}Serializer
  model_class = ${modelName}


class ${modelName}APIView(BaseListView):
  queryset = ${modelName}.objects.all()
  serializer_class = ${modelName}Serializer
  model_class = ${modelName}


class ${modelName}DetailAPIView(BaseDetailView):
  queryset = ${modelName}.objects.all()
  serializer_class = ${modelName}Serializer
  model_class = ${modelName}
  `;
