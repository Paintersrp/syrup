export const KoaModelTemplate = (modelName, fields) => {
  const lowercaseName = modelName.toLowerCase();
  const fieldDefinitions = fields.map(generateFieldDefinition).join('\n');
  const seedDefinitions = fields.map(generateSeedDefinition).join('\n');

  return `
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { faker } from '@faker-js/faker';

import { Field } from '../core/decorators/models';
import { sequelize } from '../settings';
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

  static async seed${modelName}(count: number) {
    try {
      const ${lowercaseName}Data = []

      for (let i = 0; i < count; i++) {
        ${lowercaseName}Data.push({
          ${seedDefinitions}
        })
      }

      await ${modelName}.bulkCreate(${lowercaseName}Data);

      console.log('${modelName} seeding completed successfully.');
    } catch (error) {
      console.error('${modelName} seeding failed:', error);
    }
  }
}

${modelName}.init(
  {
    ...SyModel.metaFields,
    ...${modelName}.fields,
  },
  {
    hooks: ${modelName}.hooks,
    tableName: '${lowercaseName}',
    sequelize,
  }
);
`;
};

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

export function generateSeedDefinition(field) {
  const { name, type, min, max } = field;

  const fakerMap = {
    STRING: 'faker.word.words(1)',
    NUMBER: `faker.number.int({min: ${min}, max: ${max}})`,
    BOOLEAN: `faker.datatype.boolean()`,
  };

  let fieldDefinition = `
  ${name}: ${fakerMap[type]},
  `;

  return fieldDefinition;
}
