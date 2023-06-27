import fs from 'fs-extra';
import path from 'path';

import { genComponentFiles } from '../generators/genComponentFiles.js';
import { capFirst } from '../utils/format.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();

async function buildComponentFiles(componentName, subdirectory) {
  const generatedFiles = [];
  const formattedName = capFirst(componentName);
  const componentDirectory = path.join(__dirname, 'src', 'components', subdirectory, formattedName);

  await fs.ensureDir(componentDirectory);
  Logger.log(`Generated Folders:`, 'info');
  Logger.log(`✔ ${componentDirectory} \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genComponentFiles(formattedName, generatedFiles, componentDirectory);
}

export { buildComponentFiles };
