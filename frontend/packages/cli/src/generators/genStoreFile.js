import path from 'path';

import { StoreTemplate } from '../template/store.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates a store file for the component directory.
 *
 * @param {string} lowercaseName - The lowercase name used for the store file.
 * @param {string} formattedName - The formatted name used for the store file.
 * @param {string[]} generatedFiles - An array to store the paths of the generated files.
 * @param {string} componentDirectory - The directory where the component files are located.
 * @returns {Promise<void>} A promise that resolves when the store file generation is complete.
 */
export async function genStoreFile(
  lowercaseName,
  formattedName,
  generatedFiles,
  componentDirectory
) {
  const fileName = `${lowercaseName}.tsx`;

  /**
   * Generate files and log success or fail.
   */
  try {
    await generateFile(
      path.join(componentDirectory, fileName),
      StoreTemplate(formattedName, lowercaseName),
      generatedFiles
    );
    Logger.log(`✔ Generated Store File: ${fileName}`, 'success');
  } catch (error) {
    Logger.error(`Failed to generate store file: ${fileName}`);
    Logger.error(error);
  }
}
