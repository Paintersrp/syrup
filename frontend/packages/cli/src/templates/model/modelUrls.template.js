export const ModelUrlsTemplate = (modelName) =>
  `
    path(
        "${modelName}/",
        ${modelName}APIView.as_view(),
        name="${modelName}-list",
    ),
    path(
        "${modelName}/<int:pk>/",
        ${modelName}DetailAPIView.as_view(),
        name="${modelName}-detail",
    ),
    path(
        "${modelName}/bulk/",
        ${modelName}BulkAPIView.as_view(),
        name="${modelName}-bulk-detail",
    ),
`;
