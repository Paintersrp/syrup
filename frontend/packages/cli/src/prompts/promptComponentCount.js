import inquirer from 'inquirer';

import { SyVal } from '../utils/SyVal.js';

/**
 * Prompts the user to enter the count of pre-generated components.
 *
 * @returns {Promise<number>} - The selected component count.
 *
 * @async
 *
 * @description
 * This function displays a prompt to the user, asking them to enter the count of pre-generated components they need.
 * The user input is validated using the `SyVal.number` function from the `SyVal` utility module.
 *
 * After the user enters a valid number, the function resolves with the selected component count as a number.
 *
 * The function relies on the `inquirer` package for prompting the user and the `SyVal` utility module for input validation.
 * Make sure to import the required dependencies before using this function.
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
