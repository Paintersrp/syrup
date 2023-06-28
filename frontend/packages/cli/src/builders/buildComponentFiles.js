import path from 'path';

import { genComponentFiles } from '../generators/genComponentFiles.js';
import { COMPONENTS_DIR } from '../../config.js';
import { SyLogger } from '../utils/SyLogger.js';
import { SyFormatter } from '../utils/SyFormater.js';

/**
 * Builds component files for the specified component name and subdirectory.
 *
 * @param {string} componentName - The name of the component to build.
 * @param {string} subdirectory - The subdirectory where the component will be created.
 * @returns {Promise<void>} A promise that resolves when the component files are built.
 */
async function buildComponentFiles(componentName, subdirectory) {
  const templatesUsed = [];
  const formattedName = SyFormatter.capFirst(componentName);
  const componentDirectory = path.join(COMPONENTS_DIR, subdirectory, formattedName);

  await SyLogger.ensureAndLogDir(componentDirectory);
  await genComponentFiles(formattedName, templatesUsed, componentDirectory);

  SyLogger.logStats(templatesUsed);
}

export { buildComponentFiles };
