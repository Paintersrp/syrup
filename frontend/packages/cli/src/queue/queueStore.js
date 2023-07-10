import path from 'path';

import { AppStoreTemplate } from '../templates/index.js';

/**
 * @description
 * Queues a store file for generation.
 *
 * @param {string} name - The name of the store.
 * @param {string} lowercaseName - The lowercase name of the store.
 * @param {string} directory - The target directory for the store file.
 * @param {SyGen} generator - The generator instance.
 * @async
 */
export async function queueStore(name, lowercaseName, directory, generator) {
  const fileName = `${lowercaseName}.ts`;
  const filePath = path.join(directory, fileName);

  generator.addFileToQueue(AppStoreTemplate(name, lowercaseName), filePath, 'App Store File');
}
