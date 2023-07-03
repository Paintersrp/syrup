import { handleFunction } from '../utils/error.js';
import { getPaths, SyGen } from '../utils/index.js';
import { validateDirectory } from '../utils/validate.js';

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
  await handleFunction(async () => {
    const validNames = directoryNames.filter(validateDirectory);
    const generator = new SyGen();
    const paths = getPaths();

    await generator.genDirectoriesRecursively(validNames, paths.web.src.components.abs);
  });
}
