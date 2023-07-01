import inquirer from 'inquirer';

/**
 * Prompts the user to choose a feature type.
 *
 * @returns {Promise<string>} - The selected feature type ('Individual' or 'Suite').
 *
 * @async
 *
 * @description
 * This function displays a prompt to the user, allowing them to choose a feature type.
 * It presents a list of choices including 'Individual' and 'Suite'.
 * The default selection is set to 'Individual'.
 *
 * After the user makes a selection, the function resolves with the chosen feature type as a string.
 */
export async function promptFeatureType() {
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
