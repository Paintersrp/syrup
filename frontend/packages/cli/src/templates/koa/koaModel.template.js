export const KoaModelTemplate = (modelName, fields) => {
  const fieldDefinitions = fields.map(generateFieldDefinition).join('\n');

  return `
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { Field } from '../core/decorators/models';
import { sequelize } from '../core/lib/sequelize';
import { SyModel } from '../core/SyModel';

export class ${modelName} extends SyModel<InferAttributes<${modelName}>, InferCreationAttributes<${modelName}>> {
  \n${fieldDefinitions}

  public async methodName(instance: ${modelName}) {
    return;
  }

  public static hooks = {
    beforeCreate: async (instance: ${modelName}) => {},
    afterCreate: async (instance: ${modelName}) => {},
  };
}

${modelName}.init(
  {
    ...SyModel.metaFields,
    ...${modelName}.fields,
  },
  {
    hooks: ${modelName}.hooks,
    tableName: '${modelName}',
    sequelize,
  }
);
`;
};

// add required
export function generateFieldDefinition(field) {
  const { name, type, required, verbose, defaultValue } = field;

  let fieldDefinition = `
  @Field({
    type: DataTypes.${type},
    ${!required ? `allowNull: ${required},` : ''}${verbose ? `verbose: '${verbose}',` : ''}${
    defaultValue ? `defaultValue: '${defaultValue}',` : ''
  }
  })
  declare ${name}${required ? '' : '?'}: ${type.toLowerCase()};
  `;

  return fieldDefinition;
}
