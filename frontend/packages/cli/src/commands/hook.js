import fs from 'fs-extra';
import path from 'path';

import { genHookFile } from '../generators/genHookFile.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();

async function buildHookFile(storeName) {
  const hooksDirectory = path.join(__dirname, 'src', 'hooks');

  await fs.ensureDir(hooksDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${hooksDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genHookFile(storeName, [], hooksDirectory);
}

export { buildHookFile };
