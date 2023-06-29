import { genStoreFile } from '../generators/genStoreFile.js';
import { STORES_DIR } from '../../config.js';
import { SyFormatter, SyGenerator, SyLogger } from '../utils/index.js';

/**
 * Builds a store file with the specified store name.
 *
 * @param {string} storeName - The name of the store to build the file for.
 * @returns {Promise<void>} A promise that resolves when the store file is built.
 */
async function buildStoreFile(storeName) {
  const templatesUsed = [];
  const lowercaseName = storeName.toLowerCase();
  const formattedName = SyFormatter.capFirst(storeName);

  await SyGenerator.ensureAndLogDir(STORES_DIR);
  await genStoreFile(lowercaseName, formattedName, templatesUsed, STORES_DIR);

  SyLogger.logStats(templatesUsed);
}

export { buildStoreFile };
