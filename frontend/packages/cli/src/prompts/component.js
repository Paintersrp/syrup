import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';

import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();
const componentsDirectory = path.join(__dirname, 'src', 'components');

async function promptSubdirectory() {
  // Verify src/components directory exists
  const componentsExists = await fs.pathExists(componentsDirectory);
  if (!componentsExists) {
    Logger.error('The components directory does not exist.');
  }

  // Verify src/components is not empty
  const componentFolders = await fs.readdir(componentsDirectory);
  if (componentFolders.length === 0) {
    Logger.error('There are no subdirectories in the components directory.');
  }

  // Prompt user with list of subdirectory options
  const { subdirectory } = await inquirer.prompt([
    {
      type: 'list',
      name: 'subdirectory',
      message: 'Choose a subdirectory for the component:',
      choices: componentFolders,
      default: componentFolders[0],
    },
  ]);

  return subdirectory;
}

export { promptSubdirectory };
