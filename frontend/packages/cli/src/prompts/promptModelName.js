import inquirer from 'inquirer';

/**
 * @description
 * Prompts the user to choose a model name from the existing model directories.
 *
 * @returns {Promise<string>} - The selected model name.
 * @async
 */
export async function promptModelName() {
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
