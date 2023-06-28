import path from 'path';

import { HookTemplate, PageTemplate } from '../template/shared.js';
import { IndexHookSuiteTemplate, IndexSuiteTemplate, RouteTemplate } from '../template/suite.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates suite-related files for the feature directory.
 *
 * @param {string} featureDirectory - The feature directory where the files will be generated.
 * @param {string} formattedName - The formatted name used for file generation.
 * @param {string} depluraledName - The pluralized name used for file generation.
 * @param {string[]} generatedFiles - An array to store the paths of the generated files.
 * @returns {Promise<void>} A promise that resolves when the suite file generation is complete.
 */
export async function genSuiteFiles(
  featureDirectory,
  formattedName,
  depluraledName,
  generatedFiles
) {
  /**
   * Array of file templates to be generated.
   * Each object in the array contains the following properties:
   * - template: The template file to be used.
   * - fileName: The file path and name for the generated file. It can be a string or a function.
   * - displayName: The display name for logging feedback.
   * - isPlural: A flag indicating whether the file name should be based on the pluralized name.
   *
   * @type {Array<{
   *   template: (isPlural: boolean) => string,
   *   fileName: string | ((isPlural: boolean) => string),
   *   displayName: string,
   *   isPlural?: boolean
   * }>}
   */
  const fileTemplates = [
    {
      template: (isPlural) => PageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File #1',
      isPlural: false,
    },
    {
      template: (isPlural) => PageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File #2',
      isPlural: true,
    },
    {
      template: RouteTemplate,
      fileName: path.join(featureDirectory, 'routes', 'index.tsx'),
      displayName: 'Route Index',
    },
    {
      template: IndexSuiteTemplate,
      fileName: path.join(featureDirectory, 'index.ts'),
      displayName: 'Feature Index',
    },
    {
      template: IndexHookSuiteTemplate,
      fileName: path.join(featureDirectory, 'api', 'index.ts'),
      displayName: 'API Index',
    },
    {
      template: HookTemplate,
      fileName: path.join(featureDirectory, 'api', `use${depluraledName}.ts`),
      displayName: 'Hook File #2',
    },
  ];

  /**
   * Generate files and log success or fail.
   */
  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName, isPlural = true }) => {
      try {
        const generatedFileName = typeof fileName === 'function' ? fileName(isPlural) : fileName;
        const generatedTemplate = displayName.includes('Page')
          ? template(isPlural)
          : displayName.includes('Hook')
          ? template(depluraledName)
          : template(formattedName);

        await generateFile(generatedFileName, generatedTemplate, generatedFiles);
        Logger.log(`✔ Generated ${displayName}: ${generatedFileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate ${displayName}: ${path.basename(fileName)}`);
        Logger.error(error);
      }
    })
  );
}
