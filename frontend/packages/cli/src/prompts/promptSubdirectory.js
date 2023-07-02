import inquirer from 'inquirer';
import fs from 'fs-extra';

import { SyLog } from '../utils/SyLog.js';
import { COMPONENTS_DIR } from '../../config.js';

/**
 * @description
 * Prompts the user to choose a subdirectory from the components directory or enter a new subdirectory name.
 *
 * @param {string} validatedName - The validated name of the component.
 * @returns {Promise<string>} - The selected or entered subdirectory.
 * @async
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
