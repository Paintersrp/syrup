import path from 'path';

import { AppHookTemplate } from '../templates/appHook.js';
import { SyGen } from '../utils/SyGen.js';

/**
 * Generates a hook file with the provided formatted name.
 *
 * @param {string} formattedName - The formatted name used for the hook file.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @param {string} componentDirectory - The directory where the hook file will be generated.
 * @returns {Promise<void>} A promise that resolves when the hook file generation is complete.
 */
export async function genHookFile(formattedName, templatesUsed, componentDirectory) {
  const fileName = `${formattedName}.tsx`;

  await SyGen.generateAndLogFile(
    path.join(componentDirectory, fileName),
    AppHookTemplate(formattedName),
    templatesUsed,
    'App Hook File'
  );
}
