import path from 'path';

import { AppStoreTemplate } from '../templates/appStore.js';
import { SyGenerator } from '../utils/SyGenerator.js';

/**
 * Generates a store file for the component directory.
 *
 * @param {string} lowercaseName - The lowercase name used for the store file.
 * @param {string} formattedName - The formatted name used for the store file.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @param {string} componentDirectory - The directory where the component files are located.
 * @returns {Promise<void>} A promise that resolves when the store file generation is complete.
 */
export async function genStoreFile(
  lowercaseName,
  formattedName,
  templatesUsed,
  componentDirectory
) {
  const fileName = `${lowercaseName}.tsx`;

  await SyGenerator.generateAndLogFile(
    path.join(componentDirectory, fileName),
    AppStoreTemplate(formattedName),
    templatesUsed,
    'Store File'
  );
}
