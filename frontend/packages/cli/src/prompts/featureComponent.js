import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';

import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * The path to the features directory.
 */
const featureDirectory = path.join(__dirname, 'src', 'features');

/**
 * Prompts the user to choose a feature name from the existing feature directories.
 * @returns {Promise<string>} - The selected feature name.
 */
async function promptFeatureName() {
  /**
   * Verify src/features directory exists
   */
  const featuresExists = await fs.pathExists(featureDirectory);
  if (!featuresExists) {
    Logger.error('The features directory does not exist.');
  }

  /**
   * Verify src/features is not empty
   */
  const featureFolders = await fs.readdir(featureDirectory);
  if (featureFolders.length === 0) {
    Logger.error('There are no subdirectories in the features directory.');
  }

  /**
   * Prompt user with list of feature options
   */
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

export { promptFeatureName };
