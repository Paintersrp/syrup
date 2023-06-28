import fs from 'fs-extra';
import path from 'path';

import { genComponentFiles } from '../generators/genComponentFiles.js';
import { capFirst } from '../utils/format.js';
import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * Builds component files for the specified component name and subdirectory.
 *
 * @param {string} componentName - The name of the component to build.
 * @param {string} subdirectory - The subdirectory where the component will be created.
 * @returns {Promise<void>} A promise that resolves when the component files are built.
 */
async function buildComponentFiles(componentName, subdirectory) {
  const generatedFiles = [];
  const formattedName = capFirst(componentName);
  const componentDirectory = path.join(__dirname, 'src', 'components', subdirectory, formattedName);

  await fs.ensureDir(componentDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${componentDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genComponentFiles(formattedName, generatedFiles, componentDirectory);
}

export { buildComponentFiles };
