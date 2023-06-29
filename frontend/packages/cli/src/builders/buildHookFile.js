import { genHookFile } from '../generators/genHookFile.js';
import { HOOKS_DIR } from '../../config.js';
import { SyLogger } from '../utils/SyLogger.js';
import { SyGenerator } from '../utils/SyGenerator.js';

/**
 * Builds a hook file with the specified hook name.
 *
 * @param {string} hookName - The name of the hook to build the hook file for.
 * @returns {Promise<void>} A promise that resolves when the hook file is built.
 */
async function buildHookFile(storeName) {
  const templatesUsed = [];

  await SyGenerator.ensureAndLogDir(HOOKS_DIR);
  await genHookFile(storeName, templatesUsed, HOOKS_DIR);

  SyLogger.logStats(templatesUsed);
}

export { buildHookFile };
