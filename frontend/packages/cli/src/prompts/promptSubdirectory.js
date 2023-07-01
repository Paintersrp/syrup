import inquirer from 'inquirer';
import fs from 'fs-extra';

import { SyLog } from '../utils/SyLog.js';
import { COMPONENTS_DIR } from '../../config.js';

/**
 * Prompts the user to choose a subdirectory from the components directory or enter a new subdirectory name.
 *
 * @param {string} validatedName - The validated name of the component.
 * @returns {Promise<string>} - The selected or entered subdirectory.
 *
 * @async
 *
 * @description
 * This function displays a prompt to the user, allowing them to choose an existing subdirectory from the components directory
 * or enter a new subdirectory name. It expects the validated name of the component as input.
 * It performs the following steps:
 *
 * - Checks if the components directory exists using the `fs.pathExists` method from the `fs-extra` package.
 *   If it doesn't exist, an error is logged using the `SyLog.error` method from the `SyLog` module.
 *
 * - Reads the list of subdirectories in the components directory using the `fs.readdir` method from the `fs-extra` package.
 *   If there are no subdirectories, an error is logged using the `SyLog.error` method from the `SyLog` module.
 *
 * - Displays an inquirer prompt to the user, presenting them with a list of subdirectories, including an option to create a new subdirectory
 *   or go back/cancel the selection. The prompt asks the user to choose a subdirectory for the provided validated component name.
 *
 * - Validates the user's input based on the selected choice. The validation rules are as follows:
 *   - If the user selects "cancel," the function returns a string message of "Selection canceled."
 *   - If the user selects "new," the validation is successful.
 *   - If the input is empty (after trimming), an error message of "Subdirectory name cannot be empty." is returned.
 *   - If the input is not empty but does not match any of the existing subdirectories, an error message of
 *     "Please select a valid subdirectory or enter a new name." is returned.
 *   - If the input is valid (matches an existing subdirectory), the validation is successful.
 *
 * - If the user selects the "new" option, an additional input prompt is displayed, asking the user to enter the new subdirectory name.
 *   The input is validated to ensure it is not empty and does not match any existing subdirectory names.
 *
 * - After the prompts are completed, the function resolves with the selected or entered subdirectory name.
 *   If the user chose to create a new subdirectory, the entered name is returned. Otherwise, the selected subdirectory name is returned.
 *
 * The function relies on the `inquirer` and `fs-extra` packages for prompting and file system operations, respectively.
 * It also utilizes the `SyLog` module for logging errors and messages.
 * Make sure to import the required dependencies and configurations before using this function.
 */
export async function promptSubdirectory(validatedName) {
  const componentsExists = await fs.pathExists(COMPONENTS_DIR);

  if (!componentsExists) {
    SyLog.error('The components directory does not exist.');
  }

  const componentFolders = await fs.readdir(COMPONENTS_DIR);
  if (componentFolders.length === 0) {
    SyLog.error('There are no subdirectories in the components directory.');
  }

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'subdirectory',
        message: `Choose a subdirectory for ${validatedName}:`,
        choices: [
          ...componentFolders,
          new inquirer.Separator(),
          {
            name: 'Create a new subdirectory',
            value: 'new',
          },
          {
            name: 'Go back / Cancel',
            value: 'cancel',
          },
        ],
        default: componentFolders[0],
        validate: (input) => {
          if (input === 'cancel') {
            return 'Selection canceled.';
          }
          if (input === 'new') {
            return true;
          }
          if (!input.trim()) {
            return 'Subdirectory name cannot be empty.';
          }
          if (!componentFolders.includes(input)) {
            return 'Please select a valid subdirectory or enter a new name.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'newSubdirectory',
        message: 'Enter the new subdirectory name:',
        when: (answers) => answers.subdirectory === 'new',
        validate: (input) => {
          if (!input.trim()) {
            return 'Please enter a valid subdirectory name.';
          }
          if (componentFolders.includes(input)) {
            return 'A subdirectory with that name already exists.';
          }
          return true;
        },
      },
    ])
    .then((answers) =>
      answers.subdirectory === 'new' ? answers.newSubdirectory : answers.subdirectory
    );
}
