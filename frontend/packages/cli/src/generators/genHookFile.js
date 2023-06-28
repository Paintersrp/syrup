import path from 'path';

import { AppHookTemplate } from '../template/hook.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates a hook file with the provided formatted name.
 *
 * @param {string} formattedName - The formatted name used for the hook file.
 * @param {string[]} generatedFiles - An array to store the paths of the generated files.
 * @param {string} componentDirectory - The directory where the hook file will be generated.
 * @returns {Promise<void>} A promise that resolves when the hook file generation is complete.
 */
export async function genHookFile(formattedName, generatedFiles, componentDirectory) {
  const fileName = `${formattedName}.tsx`;

  /**
   * Generate the hook file and log success or failure.
   */
  try {
    await generateFile(
      path.join(componentDirectory, fileName),
      AppHookTemplate(formattedName),
      generatedFiles
    );
    Logger.log(`✔ Generated Hook File: ${fileName}`, 'success');
  } catch (error) {
    Logger.error(`Failed to generate hook file: ${fileName}`);
    Logger.error(error);
  }
}
