import { genHookFile } from '../generators/genHookFile.js';
import { HOOKS_DIR } from '../../config.js';
import { SyLog } from '../utils/SyLog.js';
import { SyGen } from '../utils/SyGen.js';

/**
 * Builds a hook file with the specified hook name.
 *
 * @param {string} hookName - The name of the hook to build the hook file for.
 * @returns {Promise<void>} A promise that resolves when the hook file is built.
 */
async function buildHookFile(hookName) {
  const templatesUsed = [];

  await SyGen.ensureAndLogDir(HOOKS_DIR);
  await genHookFile(hookName, templatesUsed, HOOKS_DIR);

  SyLog.logStats(templatesUsed);
}

export { buildHookFile };
