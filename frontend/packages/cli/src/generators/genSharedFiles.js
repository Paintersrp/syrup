import path from 'path';

import { ComponentBasicTemplate } from '../templates/componentBasic.js';
import { FeatureHookTemplate } from '../templates/featureHook.js';
import { IndexTypesTemplate } from '../templates/indexTypes.js';
import { SyLogger } from '../utils/SyLogger.js';

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
  const fileTemplates = [
    {
      template: ComponentBasicTemplate,
      fileName: (i) => path.join(featureDirectory, 'components', `${formattedName}${i}.tsx`),
      displayName: 'Component Basic File',
    },
    {
      template: FeatureHookTemplate,
      fileName: path.join(featureDirectory, 'api', `use${formattedName}.tsx`),
      displayName: 'Feature Hook File',
    },
    {
      template: IndexTypesTemplate,
      fileName: path.join(featureDirectory, 'types', 'index.ts'),
      displayName: 'Types Index',
    },
  ];

  const componentPromises = Array.from({ length: componentCount }, (_, i) => i + 1).map(
    async (i) => {
      const componentName = `${formattedName}${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      const fileTemplate = fileTemplates.find(
        ({ displayName }) => displayName === 'Component Basic File'
      );
      const template = fileTemplate.template(componentName);
      const fileName = fileTemplate.fileName(i);

      await SyLogger.generateAndLogFile(
        fileName,
        template,
        templatesUsed,
        fileTemplate.displayName,
        fileName
      );
    }
  );

  const indexFilePath = path.join(featureDirectory, 'components', 'index.ts');
  const componentImportsContent = componentImports.join('\n');

  await SyLogger.generateAndLogFile(
    indexFilePath,
    componentImportsContent,
    templatesUsed,
    'Component Index',
    indexFilePath
  );

  const remainingFilePromises = fileTemplates
    .filter(({ displayName }) => displayName !== 'Component Basic File')
    .map(async ({ template, fileName, displayName }) => {
      const generatedTemplate = template(formattedName);

      await SyLogger.generateAndLogFile(
        fileName,
        generatedTemplate,
        templatesUsed,
        displayName,
        fileName
      );
    });

  await Promise.all([...componentPromises, ...remainingFilePromises]);
}
