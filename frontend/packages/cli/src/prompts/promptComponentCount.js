import inquirer from 'inquirer';

import { SyVal } from '../utils/SyVal.js';

/**
 * @description
 * Prompts the user to enter the count of pre-generated components.
 *
 * @returns {Promise<number>} - The selected component count.
 * @async
 */
export async function promptComponentCount() {
  const { componentCount } = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentCount',
      message: 'Enter the number of pre-generated components you need:',
      validate: SyVal.number,
    },
  ]);

  return parseInt(componentCount);
}
