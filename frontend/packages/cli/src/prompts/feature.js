import inquirer from 'inquirer';
import { validateNumber } from '../utils/validate.js';

/**
 * Prompts the user to choose a feature type.
 * @returns {Promise<string>} - The selected feature type ('Individual' or 'Suite').
 */
async function promptFeatureType() {
  const { featureType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'featureType',
      message: 'What type of feature do you want?',
      choices: ['Individual', 'Suite'],
      default: 'Individual',
    },
  ]);

  return featureType;
}

/**
 * Prompts the user to enter the count of pre-generated components.
 * @returns {Promise<number>} - The selected component count.
 */
async function promptComponentCount() {
  const { componentCount } = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentCount',
      message: 'How many pre-generated components do you want?',
      validate: validateNumber,
    },
  ]);

  return parseInt(componentCount);
}

export { promptFeatureType, promptComponentCount };
