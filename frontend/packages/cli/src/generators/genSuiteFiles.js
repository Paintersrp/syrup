import path from 'path';

import {
  FeatureHookTemplate,
  FeaturePageTemplate,
  FeatureRoutesSuiteTemplate,
  IndexHookSuiteTemplate,
  IndexSuiteTemplate,
} from '../templates/index.js';
import { SyGenerator } from '../utils/SyGenerator.js';

/**
 * Generates suite-related files for the feature directory.
 *
 * @param {string} featureDirectory - The feature directory where the files will be generated.
 * @param {string} formattedName - The formatted name used for file generation.
 * @param {string} depluraledName - The pluralized name used for file generation.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @returns {Promise<void>} A promise that resolves when the suite file generation is complete.
 */
export async function genSuiteFiles(
  featureDirectory,
  formattedName,
  depluraledName,
  templatesUsed
) {
  const generator = new SyGenerator();

  [formattedName, depluraledName].forEach((name) => {
    generator.addFileTemplate(
      FeaturePageTemplate(name),
      path.join(featureDirectory, 'routes', `${name}.tsx`),
      'Page File'
    );
  });

  generator.addFileTemplate(
    FeatureRoutesSuiteTemplate(formattedName),
    path.join(featureDirectory, 'routes', 'index.tsx'),
    'Suite Route Index'
  );

  generator.addFileTemplate(
    IndexSuiteTemplate(formattedName),
    path.join(featureDirectory, 'index.ts'),
    'Feature Index'
  );

  generator.addFileTemplate(
    IndexHookSuiteTemplate(formattedName),
    path.join(featureDirectory, 'api', 'index.ts'),
    'API Index'
  );

  generator.addFileTemplate(
    FeatureHookTemplate(depluraledName),
    path.join(featureDirectory, 'api', `use${depluraledName}.ts`),
    'Feature Hook File'
  );

  await generator.generateManyFiles(templatesUsed);
}
