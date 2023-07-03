import fs from 'fs-extra';
import inquirer from 'inquirer';

import { ModelSchemaTemplate } from '../templates/model/modelSchema.template.js';
import { handleFunction } from '../utils/error.js';
// import { getPaths } from '../utils/getPaths.js';
// import { SyGen } from '../utils/SyGen.js';

export async function generateModelSchema() {
  await handleFunction(async () => {
    // const generator = new SyGen();
    // const paths = getPaths();

    const promptModelName = async () => {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'modelName',
          message: 'Enter the model name:',
        },
      ]);

      promptFields(answers.modelName);
    };

    const promptFields = async (modelName) => {
      const fields = [];

      const promptField = async () => {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'fieldName',
            message: 'Enter the field name (or leave empty to finish):',
          },
        ]);

        const fieldName = answers.fieldName.trim();

        if (fieldName === '') {
          generateAndSaveModelTemplate(modelName, fields);
        } else {
          const fieldAnswers = await inquirer.prompt([
            {
              type: 'list',
              name: 'fieldType',
              message: 'Select the field type:',
              choices: ['char', 'int', 'text', 'email', 'boolean', 'url'],
            },
          ]);

          fields.push({ name: fieldName, type: fieldAnswers.fieldType });
          promptField();
        }
      };

      promptField();
    };

    const generateAndSaveModelTemplate = (modelName, fields) => {
      const modelTemplate = ModelSchemaTemplate(modelName, fields);
      const fileName = `${modelName}.py`;

      fs.writeFile(fileName, modelTemplate, (err) => {
        if (err) {
          console.error('Error creating model:', err);
        } else {
          console.log(`Model "${modelName}" created successfully!`);
        }
      });
    };

    promptModelName();
  });
}
