import path from 'path';

import {
  FeaturePageTemplate,
  FeatureRoutesIndividualTemplate,
  IndexBasicTemplate,
  IndexHookIndividualTemplate,
} from '../templates/index.js';
import { SyGen } from '../utils/SyGen.js';

/**
 * Generates individual feature files for a given feature directory and formatted name.
 *
 * @param {string} featureDirectory - The directory where the feature files will be generated.
 * @param {string} formattedName - The formatted name used for the feature files.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @returns {Promise<void>} A promise that resolves when the individual feature file generation is complete.
 */
export async function genIndividualFiles(featureDirectory, formattedName, templatesUsed) {
  const generator = new SyGen();

  generator.addFileTemplate(
    FeaturePageTemplate(formattedName),
    path.join(featureDirectory, 'routes', `${formattedName}.tsx`),
    'Page File'
  );

  generator.addFileTemplate(
    FeatureRoutesIndividualTemplate(formattedName),
    path.join(featureDirectory, 'routes', 'index.ts'),
    'Individual Route Index'
  );

  generator.addFileTemplate(
    IndexBasicTemplate(formattedName),
    path.join(featureDirectory, 'index.ts'),
    'Feature Index'
  );

  generator.addFileTemplate(
    IndexHookIndividualTemplate(formattedName),
    path.join(featureDirectory, 'api', 'index.ts'),
    'API Index'
  );

  await generator.generateManyFiles(templatesUsed);
}
