export const ModelSerializerTemplate = (modelName) =>
  `
class ${modelName}Serializer(serializers.ModelSerializer): \n
  FIELD_KEYS = ["id"]

  class Meta:
      model = ${modelName}
      fields = "__all__"
`;
