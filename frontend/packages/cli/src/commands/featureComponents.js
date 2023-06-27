import fs from 'fs-extra';
import path from 'path';

import { genFeatureComponentFiles } from '../generators/genFeatureComponentFiles.js';
import { capFirst } from '../utils/format.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();

async function buildFeatureComponentFiles(featureName, componentCount) {
  const generatedFiles = [];
  const componentImports = [];
  const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
  const formattedName = capFirst(featureName);

  await fs.ensureDir(featureDirectory);
  Logger.log(`Folder Used:`, 'info');
  Logger.log(`✔ ${featureDirectory}\\components \n`, 'success');

  Logger.log(`Generated Files:`, 'info');
  await genFeatureComponentFiles(
    featureDirectory,
    formattedName,
    generatedFiles,
    componentCount,
    componentImports
  );
}

export { buildFeatureComponentFiles };
