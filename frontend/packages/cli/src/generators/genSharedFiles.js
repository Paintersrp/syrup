import path from 'path';
import { FEATURE_COMPONENT_TYPE } from '../../config.js';

import {
  ComponentBasicTemplate,
  ComponentFullTemplate,
  FeatureHookTemplate,
  IndexTypesTemplate,
} from '../templates/index.js';
import { SyGen } from '../utils/SyGen.js';

/**
 * Generates shared files for a feature directory with components, hooks, and types.
 *
 * @param {string} featureDirectory - The directory where the feature files will be generated.
 * @param {string} formattedName - The formatted name used for the feature files.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @param {number} componentCount - The number of components to generate.
 * @param {string[]} componentImports - An array to store the component imports for the index file.
 * @returns {Promise<void>} A promise that resolves when the shared file generation is complete.
 */
export async function genSharedFiles(
  featureDirectory,
  formattedName,
  templatesUsed,
  componentCount,
  componentImports
) {
  /**
   * Array of file templates to be generated.
   * Each object in the array contains the following properties:
   * - template: The template file to be used.
   * - fileName: The file path and name for the generated file.
   * - displayName: The display name for logging feedback.
   *
   * @type {Array<{ template: string, fileName: string, displayName: string }>}
   */

  const generator = new SyGen();

  for (let i = 1; i <= componentCount; i++) {
    const componentName = `${formattedName}${i}`;
    componentImports.push(`export { ${componentName} } from './${componentName}';`);

    let fileTemplate;
    if (FEATURE_COMPONENT_TYPE === 'basic') {
      fileTemplate = ComponentBasicTemplate(componentName);
    } else {
      fileTemplate = ComponentFullTemplate(componentName);
    }

    const fileName = path.join(featureDirectory, 'components', `${componentName}.tsx`);

    await generator.addFileTemplate(fileTemplate, fileName, 'Component File');
  }

  generator.addFileTemplate(
    FeatureHookTemplate(formattedName),
    path.join(featureDirectory, 'api', `use${formattedName}.tsx`),
    'Feature Hook File'
  );

  generator.addFileTemplate(
    IndexTypesTemplate(formattedName),
    path.join(featureDirectory, 'types', 'index.ts'),
    'Types Index'
  );

  generator.addFileTemplate(
    componentImports.join('\n'),
    path.join(featureDirectory, 'components', 'index.ts'),
    'Component Index'
  );

  generator.addFileTemplate('', path.join(featureDirectory, 'types', 'index.ts'), 'Types Index');

  await generator.generateManyFiles(templatesUsed);
}
