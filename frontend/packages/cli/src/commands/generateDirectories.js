import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { SyErr, SyGen, SyVal } from '../utils/index.js';

/**
 * @description
 * Generates directories based on the provided directory names.
 *
 * @param {string[]} directoryNames - An array of directory names.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
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
