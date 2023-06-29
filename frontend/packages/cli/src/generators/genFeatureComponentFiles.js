import path from 'path';

import { ComponentBasicTemplate } from '../templates/componentBasic.js';
import { SyGenerator } from '../utils/SyGenerator.js';

/**
 * Generates component files for a feature.
 * @param {string} featureDirectory - The directory path of the feature.
 * @param {string} formattedName - The formatted name of the feature.
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {number} componentCount - The number of components to generate.
 * @param {Array} componentImports - An array to store the component imports for the index file.
 * @returns {Promise<void>}
 */
export async function genFeatureComponentFiles(
  featureDirectory,
  formattedName,
  templatesUsed,
  componentCount,
  componentImports
) {
  const generator = new SyGenerator();

  await Promise.all(
    Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
      const componentName = `${formattedName}Gen${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      await generator.generateAndLogFile(
        path.join(featureDirectory, 'components', `${componentName}.tsx`),
        ComponentBasicTemplate(componentName),
        templatesUsed,
        'Component Basic File'
      );
    })
  );

  const indexFilePath = path.join(featureDirectory, 'components', 'index.ts');
  const componentImportsContent = componentImports.join('\n');

  await generator.generateAndLogFile(
    indexFilePath,
    componentImportsContent,
    templatesUsed,
    'Component Index'
  );
}
