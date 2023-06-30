import inquirer from 'inquirer';

import { SyVal } from '../utils/SyVal.js';

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
      validate: SyVal.number,
    },
  ]);

  return parseInt(componentCount);
}
