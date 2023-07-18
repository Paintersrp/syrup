export const KoaDTOTypesTemplate = (modelName, fields) => {
  const fieldDefinitions = fields.map(generateTypeDefinition).join('\n');

  return `
    export type ${modelName}DTO = { \n${fieldDefinitions} };
    `;
};

export function generateTypeDefinition(field) {
  const { name, type } = field;
  let fieldDefinition = `${name}: ${type.toLowerCase()}`;

  return fieldDefinition;
}
