import path from 'path';

import { genFeatureComponentFiles } from '../generators/genFeatureComponentFiles.js';
import { FEATURES_DIR } from '../../config.js';
import { SyFormatter, SyGenerator, SyLogger } from '../utils/index.js';

/**
 * Builds feature component files for the specified feature name and component count.
 *
 * @param {string} featureName - The name of the feature to build component files for.
 * @param {number} componentCount - The number of components to generate for the feature.
 * @returns {Promise<void>} A promise that resolves when the feature component files are built.
 */
async function buildFeatureComponentFiles(featureName, componentCount) {
  const templatesUsed = [];
  const componentImports = [];
  const featureDirectory = path.join(FEATURES_DIR, featureName);
  const formattedName = SyFormatter.capFirst(featureName);

  await SyGenerator.ensureAndLogDir(featureDirectory);
  await genFeatureComponentFiles(
    featureDirectory,
    formattedName,
    templatesUsed,
    componentCount,
    componentImports
  );

  SyLogger.logStats(templatesUsed);
}

export { buildFeatureComponentFiles };
