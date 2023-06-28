import inquirer from 'inquirer';

/**
 * Prompts the user to choose a feature type.
 * @returns {Promise<string>} - The selected feature type ('Individual' or 'Suite').
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
