import fs from 'fs-extra';
import path from 'path';

import { FEATURE_SUBDIRS } from '../../config.js';
import { SyLogger } from '../utils/SyLogger.js';

/**
 * Generates some empty index files in subdirectories of features.
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {string} featureDirectory - The directory path where the files will be generated.
 * @returns {Promise<void>}
 */
export async function genEmptyIndexes(templatesUsed, featureDirectory) {
  await Promise.all(
    FEATURE_SUBDIRS.map(async (subdir) => {
      await fs.ensureDir(path.join(featureDirectory, subdir));
      if (subdir === 'types') {
        await SyLogger.generateAndLogFile(
          path.join(featureDirectory, subdir, 'index.ts'),
          '',
          templatesUsed,
          'Type Index',
          'index.ts'
        );
      }
    })
  );
}
