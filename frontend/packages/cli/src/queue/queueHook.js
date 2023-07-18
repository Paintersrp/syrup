import path from 'path';

import { AppHookTemplate } from '../templates/index.js';
import { queueIndexUpdate } from './queueIndexUpdate.js';

/**
 * @description
 * Queues a hook file.
 *
 * @param {string} name - The name of the hook.
 * @param {string} directory - The target directory for the hook file.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueHook(name, directory, generator) {
  const fileName = `${name}.tsx`;
  const filePath = path.join(directory, fileName);
  const exportStatement = `export { ${name} } from './${name}';\n`;

  await queueIndexUpdate(exportStatement, directory, 'Updated Hook Index File', generator);
  await generator.addFileToQueue(AppHookTemplate(name), filePath, 'App Hook File');
}
