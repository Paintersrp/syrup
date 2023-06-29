import path from 'path';

import { genComponentFiles } from '../generators/genComponentFiles.js';
import { COMPONENTS_DIR } from '../../config.js';
import { SyFormatter, SyGenerator } from '../utils/index.js';

/**
 * Builds component files for the specified component name and subdirectory.
 *
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {string} componentName - The name of the component to build.
 * @param {string} subdirectory - The subdirectory where the component will be created.
 * @returns {Promise<void>} A promise that resolves when the component files are built.
 */
async function buildComponentFiles(templatesUsed, componentName, subdirectory) {
  const formattedName = SyFormatter.capFirst(componentName);
  const componentDirectory = path.join(COMPONENTS_DIR, subdirectory, formattedName);

  await SyGenerator.ensureAndLogDir(componentDirectory);
  await genComponentFiles(formattedName, templatesUsed, componentDirectory);
}

export { buildComponentFiles };
