import path from 'path';

import { ComponentBasicTemplate, HookTemplate, IndexTypesTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates shared files for a feature directory with components, hooks, and types.
 *
 * @param {string} featureDirectory - The directory where the feature files will be generated.
 * @param {string} formattedName - The formatted name used for the feature files.
 * @param {string[]} generatedFiles - An array to store the paths of the generated files.
 * @param {number} componentCount - The number of components to generate.
 * @param {string[]} componentImports - An array to store the component imports for the index file.
 * @returns {Promise<void>} A promise that resolves when the shared file generation is complete.
 */
export async function genSharedFiles(
  featureDirectory,
  formattedName,
  generatedFiles,
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
      displayName: 'Component File',
    },
    {
      template: HookTemplate,
      fileName: path.join(featureDirectory, 'api', `use${formattedName}.tsx`),
      displayName: 'Hook File',
    },
    {
      template: IndexTypesTemplate,
      fileName: path.join(featureDirectory, 'types', 'index.ts'),
      displayName: 'Types Index',
    },
  ];

  const componentPromises = Array.from({ length: componentCount }, (_, i) => i + 1).map(
    async (i) => {
      /**
       * Iterates the number of components, creating imports in the index.
       */
      const componentName = `${formattedName}${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      /**
       * Finds the component template and sets the generated component name using the index.
       */
      const fileTemplate = fileTemplates.find(
        ({ displayName }) => displayName === 'Component File'
      );
      const template = fileTemplate.template(componentName);
      const fileName = fileTemplate.fileName(i);

      /**
       * Generate component and log success or fail.
       */
      try {
        await generateFile(fileName, template, generatedFiles);
        Logger.log(`✔ Generated Component #${i}: ${fileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to Generate Component: ${path.basename(fileName)}`);
        Logger.error(error);
      }

      /**
       * Generate the index.ts file with component imports.
       */
      const indexFilePath = path.join(featureDirectory, 'components', 'index.ts');
      const componentImportsContent = componentImports.join('\n');
      await generateFile(indexFilePath, componentImportsContent, generatedFiles);
      Logger.log(`✔ Generated Component Index: ${indexFilePath}`, 'success');
    }
  );

  const remainingFilePromises = fileTemplates
    .filter(({ displayName }) => displayName !== 'Component File')
    .map(async ({ template, fileName, displayName }) => {
      /**
       * Checks if fileName requires a function (for Component) and provides an empty index.
       */
      const generatedFileName = fileName;
      const generatedTemplate = template(formattedName);

      /**
       * Generate files and log success or fail.
       */
      try {
        await generateFile(generatedFileName, generatedTemplate, generatedFiles);
        Logger.log(`✔ Generated ${displayName}: ${generatedFileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate ${displayName}: ${path.basename(fileName)}`);
        Logger.error(error);
      }
    });

  await Promise.all([...componentPromises, ...remainingFilePromises]);
}
