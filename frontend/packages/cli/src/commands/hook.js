import fs from 'fs-extra';
import path from 'path';

import { genHookFile } from '../generators/genHookFile.js';
import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * Builds a hook file for the specified store name.
 *
 * @param {string} storeName - The name of the store to build the hook file for.
 * @returns {Promise<void>} A promise that resolves when the hook file is built.
 */
async function buildHookFile(storeName) {
  const hooksDirectory = path.join(__dirname, 'src', 'hooks');

  await fs.ensureDir(hooksDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${hooksDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genHookFile(storeName, [], hooksDirectory);
}

export { buildHookFile };
