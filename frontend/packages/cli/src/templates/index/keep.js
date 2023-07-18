export const AppTypesTemplate = (appName, fields) => {
  const fieldDefinitions = fields.map(generateTypeDefinition).join('\n');

  return `
    export type ${appName}DTO = { \n${fieldDefinitions} };
    `;
};

export function generateTypeDefinition(field) {
  const { name, type } = field;
  let fieldDefinition = `${name}: ${type}`;

  return fieldDefinition;
}
