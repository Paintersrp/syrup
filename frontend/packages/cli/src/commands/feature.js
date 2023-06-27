import fs from 'fs-extra';
import path from 'path';

import { capFirst, deplural, generateFile } from '../utils/index.js';
import { genIndividualFiles, genSharedFiles, genSuiteFiles } from '../generators/index.js';
import { Logger } from '../utils/logger.js';

const __dirname = path.resolve();
const featureSubdirectories = ['api', 'components', 'routes', 'types'];

async function buildFeatureFiles(featureName, type, componentCount) {
  const generatedFiles = [];
  const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
  const formattedName = capFirst(featureName);
  const depluraledName = deplural(formattedName);

  await fs.ensureDir(featureDirectory);

  await Promise.all(
    featureSubdirectories.map(async (subdir) => {
      await fs.ensureDir(path.join(featureDirectory, subdir));
      if (subdir !== 'routes') {
        await generateFile(path.join(featureDirectory, subdir, 'index.ts'), '', generatedFiles);
      }
    })
  );

  if (type === 'Individual') {
    await genIndividualFiles(featureDirectory, formattedName, generatedFiles);
  }

  if (type === 'Suite') {
    await genSuiteFiles(featureDirectory, formattedName, depluraledName, generatedFiles);
  }

  const componentImports = [];

  await genSharedFiles(
    featureDirectory,
    formattedName,
    generatedFiles,
    componentCount,
    componentImports
  );

  if (generatedFiles.length > 0) {
    Logger.log('\nGenerated files:', 'info');
    for (const file of generatedFiles) {
      Logger.log(`✔ ${file}`, 'success');
    }
  }
}

export { buildFeatureFiles };
