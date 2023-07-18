import { capFirst } from '../../utils/format.js';

export const KoaSchemaTemplate = (modelName, fields) => {
  const fieldDefinitions = fields.map(generateSchemaFieldDefinition).join('\n');

  return `
  import * as Yup from 'yup';

  export const ${modelName}Schema = Yup.object().shape({
    \n${fieldDefinitions}
  });
  `;
};

export function generateSchemaFieldDefinition(field) {
  const { name, type, min, max, required } = field;

  const cappedName = capFirst(name);

  let fieldDefinition = `${name}: Yup.${type.toLowerCase()}()
  ${type === 'STRING' ? '.trim()' : ''}
  ${required ? `.required("${cappedName} is required.")` : ''}
  ${min ? `.min(${min}, "${cappedName} must be at least ${min} characters.")` : ''}
  ${max ? `.max(${max}, "${cappedName} cannot exceed ${max} characters."),` : ','}
  `;

  return fieldDefinition;
}
