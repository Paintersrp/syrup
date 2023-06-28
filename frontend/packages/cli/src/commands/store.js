import fs from 'fs-extra';
import path from 'path';

import { genStoreFile } from '../generators/genStoreFile.js';
import { capFirst } from '../utils/format.js';
import { Logger } from '../utils/logger.js';

/**
 * The current directory path.
 */
const __dirname = path.resolve();

/**
 * Builds a store file for the specified store name.
 *
 * @param {string} storeName - The name of the store to build the file for.
 * @returns {Promise<void>} A promise that resolves when the store file is built.
 */
async function buildStoreFile(storeName) {
  const lowercaseName = storeName.toLowerCase();
  const formattedName = capFirst(storeName);
  const storeDirectory = path.join(__dirname, 'src', 'stores');

  await fs.ensureDir(storeDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${storeDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genStoreFile(lowercaseName, formattedName, [], storeDirectory);
}

export { buildStoreFile };
