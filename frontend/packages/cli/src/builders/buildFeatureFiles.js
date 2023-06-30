import path from 'path';

import { FEATURES_DIR, FEATURE_SUBDIRS } from '../../config.js';
import { genIndividualFiles, genSharedFiles, genSuiteFiles } from '../generators/index.js';
import { SyAlter, SyGen, SyLog } from '../utils/index.js';

/**
 * Builds feature files for the specified feature name, type, and component count.
 *
 * @param {string} featureName - The name of the feature to build.
 * @param {string} type - The type of feature ('Individual' or 'Suite').
 * @param {number} componentCount - The number of components to generate for the feature.
 * @returns {Promise<void>} A promise that resolves when the feature files are built.
 */
async function buildFeatureFiles(featureName, type, componentCount) {
  const templatesUsed = [];
  const componentImports = [];
  const featureDirectory = path.join(FEATURES_DIR, featureName);
  const formattedName = SyAlter.capFirst(featureName);
  const depluraledName = SyAlter.deplural(formattedName);

  await SyGen.ensureAndLogDir(featureDirectory);

  FEATURE_SUBDIRS.map(async (subdir) => {
    await SyGen.ensureAndLogDir(path.join(featureDirectory, subdir));
  });

  if (type === 'Individual') {
    await genIndividualFiles(featureDirectory, formattedName, templatesUsed);
  }

  if (type === 'Suite') {
    await genSuiteFiles(featureDirectory, formattedName, depluraledName, templatesUsed);
  }

  await genSharedFiles(
    featureDirectory,
    formattedName,
    templatesUsed,
    componentCount,
    componentImports
  );

  SyLog.logStats(templatesUsed);
}

export { buildFeatureFiles };
