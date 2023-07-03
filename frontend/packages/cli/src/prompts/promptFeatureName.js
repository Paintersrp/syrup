import fs from 'fs-extra';
import inquirer from 'inquirer';

import { FEATURES_DIR } from '../utils/getPaths.js';
import { SyLog } from '../utils/SyLog.js';

/**
 * @description
 * Prompts the user to choose a feature name from the existing feature directories.
 *
 * @returns {Promise<string>} - The selected feature name.
 * @async
 */
export async function promptFeatureName() {
  const featuresExists = await fs.pathExists(FEATURES_DIR);
  if (!featuresExists) {
    SyLog.log('The features directory does not exist.', 'error');
    process.exit(1);
  }

  const featureFolders = await fs.readdir(FEATURES_DIR);
  if (featureFolders.length === 0) {
    SyLog.log('There are no subdirectories in the features directory.', 'error');
    process.exit(1);
  }

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'featureName',
        message: 'Choose a feature:',
        choices: featureFolders,
      },
    ])
    .then((answers) => answers.featureName);
}
