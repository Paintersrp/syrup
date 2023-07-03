import fs from 'fs-extra';
import path from 'path';

/**
 * @description
 * Queues the update of an index file by appending an export statement for a specific module.
 *
 * @param {string} name - The name of the module.
 * @param {string} directory - The directory containing the index file.
 * @param {string} logMessage - The log message for the file update.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueIndexUpdate(name, directory, logMessage, generator) {
  const exportStatement = `export { ${name} } from './${name}';\n`;
  const indexFilePath = path.join(directory, 'index.ts');

  const indexFileContent = await fs.promises.readFile(indexFilePath, 'utf8');
  const updatedIndexFileContent = `${indexFileContent.trimEnd()}\n${exportStatement}`;

  generator.addFileToQueue(updatedIndexFileContent, indexFilePath, logMessage);
}
