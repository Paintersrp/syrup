import inquirer from 'inquirer';

/**
 * @description
 * Prompts the user to choose an app name.
 *
 * @returns {Promise<string>} - The selected app name.
 * @async
 */
export async function promptKoaModelName() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'modelName',
        message: 'Enter the model name:',
      },
    ])
    .then((answers) => answers.modelName);
}
