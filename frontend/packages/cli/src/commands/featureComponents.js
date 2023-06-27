import fs from 'fs-extra';
import path from 'path';

import { capFirst } from '../utils/index.js';
import { genFeatureComponentFiles } from '../generators/genFeatureComponentFiles.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();

async function buildFeatureComponentFiles(featureName, componentCount) {
  const generatedFiles = [];
  const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
  const formattedName = capFirst(featureName);
  await fs.ensureDir(featureDirectory);

  const componentImports = [];

  await genFeatureComponentFiles(
    featureDirectory,
    formattedName,
    generatedFiles,
    componentCount,
    componentImports
  );

  if (generatedFiles.length > 0) {
    Logger.log('Generated files:', 'info');
    for (const file of generatedFiles) {
      Logger.log(`✔ ${file}`, 'success');
    }
  }
}

export { buildFeatureComponentFiles };
