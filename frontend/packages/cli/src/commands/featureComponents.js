import fs from 'fs-extra';
import path from 'path';

import { genFeatureComponentFiles } from '../generators/genFeatureComponentFiles.js';
import { capFirst } from '../utils/format.js';
import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * Builds feature component files for the specified feature name and component count.
 *
 * @param {string} featureName - The name of the feature to build component files for.
 * @param {number} componentCount - The number of components to generate for the feature.
 * @returns {Promise<void>} A promise that resolves when the feature component files are built.
 */
async function buildFeatureComponentFiles(featureName, componentCount) {
  const generatedFiles = [];
  const componentImports = [];
  const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
  const formattedName = capFirst(featureName);

  await fs.ensureDir(featureDirectory);
  Logger.log(`Folder Used:`, 'info');
  Logger.log(`✔ ${featureDirectory}\\components \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genFeatureComponentFiles(
    featureDirectory,
    formattedName,
    generatedFiles,
    componentCount,
    componentImports
  );
}

export { buildFeatureComponentFiles };
