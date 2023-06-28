import inquirer from 'inquirer';

import { SyValidator } from '../utils/SyValidator.js';

/**
 * Prompts the user to enter the count of pre-generated components.
 * @returns {Promise<number>} - The selected component count.
 */
export async function promptComponentCount() {
  const { componentCount } = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentCount',
      message: 'How many pre-generated components do you want?',
      validate: SyValidator.number,
    },
  ]);

  return parseInt(componentCount);
}
