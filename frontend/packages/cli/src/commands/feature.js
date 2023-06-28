import fs from 'fs-extra';
import path from 'path';

import { genIndividualFiles } from '../generators/genIndividualFiles.js';
import { genSharedFiles } from '../generators/genSharedFiles.js';
import { genSuiteFiles } from '../generators/genSuiteFiles.js';

import { capFirst, deplural } from '../utils/format.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * Constant of folders that should be generated within the feature folder.
 */
const featureSubdirectories = ['api', 'components', 'routes', 'types'];

/**
 * Builds feature files for the specified feature name, type, and component count.
 *
 * @param {string} featureName - The name of the feature to build.
 * @param {string} type - The type of feature ('Individual' or 'Suite').
 * @param {number} componentCount - The number of components to generate for the feature.
 * @returns {Promise<void>} A promise that resolves when the feature files are built.
 */
async function buildFeatureFiles(featureName, type, componentCount) {
  const generatedFiles = [];
  const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
  const formattedName = capFirst(featureName);
  const depluraledName = deplural(formattedName);

  await fs.ensureDir(featureDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${featureDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await Promise.all(
    featureSubdirectories.map(async (subdir) => {
      await fs.ensureDir(path.join(featureDirectory, subdir));
      if (subdir !== 'routes') {
        await generateFile(path.join(featureDirectory, subdir, 'index.ts'), '', generatedFiles);
      }
    })
  );

  if (type === 'Individual') {
    await genIndividualFiles(featureDirectory, formattedName, generatedFiles);
  }

  if (type === 'Suite') {
    await genSuiteFiles(featureDirectory, formattedName, depluraledName, generatedFiles);
  }

  const componentImports = [];

  await genSharedFiles(
    featureDirectory,
    formattedName,
    generatedFiles,
    componentCount,
    componentImports
  );
}

export { buildFeatureFiles };
