import fs from 'fs-extra';
import path from 'path';

import { genComponentFiles } from '../generators/genComponentFiles.js';
import { capFirst } from '../utils/index.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();

async function buildComponentFiles(componentName, subdirectory) {
  const generatedFiles = [];
  const formattedName = capFirst(componentName);
  const componentDirectory = path.join(__dirname, 'src', 'components', subdirectory, formattedName);

  await fs.ensureDir(componentDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${componentDirectory} \n`, 'success');

  await genComponentFiles(formattedName, generatedFiles, componentDirectory);

  if (generatedFiles.length > 0) {
    Logger.log('Generated Files:', 'info');
    for (const file of generatedFiles) {
      Logger.log(`✔ ${file}`, 'success');
    }
  }
}

export { buildComponentFiles };
