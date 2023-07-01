import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { SyErr, SyGen, SyVal } from '../utils/index.js';

/**
 * Generate directories based on the provided directory names.
 *
 * @param {string[]} directoryNames - An array of directory names.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates directories based on the provided directory names.
 * It receives an array of directory names and ensures that each name is valid using the SyVal class.
 *
 * The function creates an instance of the SyGen class as the generator.
 * It then filters the directory names to include only the valid names, using the SyVal.directory method.
 *
 * For each valid name, the function constructs the directory path by joining the name with the COMPONENTS_DIR constant.
 * It uses the generator's ensureAndLogDir method to ensure the existence of the directory and log the operation.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 */
export async function generateDirectories(directoryNames) {
  await SyErr.handle(async () => {
    const validNames = directoryNames.filter(SyVal.directory);
    const generator = new SyGen();

    validNames.forEach((name) => {
      const dirPath = path.join(COMPONENTS_DIR, name);
      generator.ensureAndLogDir(dirPath);
    });
  });
}
