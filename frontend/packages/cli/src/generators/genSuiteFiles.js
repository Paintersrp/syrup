import path from 'path';

import { FeatureHookTemplate } from '../templates/featureHook.js';
import { IndexHookSuiteTemplate } from '../templates/indexHookSuite.js';
import { IndexSuiteTemplate } from '../templates/indexSuite.js';
import { FeatureRoutesSuiteTemplate } from '../templates/featureRoutesSuite.js';
import { FeaturePageTemplate } from '../templates/featurePage.js';
import { SyLogger } from '../utils/SyLogger.js';

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
      template: (isPlural) => FeaturePageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File',
      isPlural: false,
    },
    {
      template: (isPlural) => FeaturePageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File',
      isPlural: true,
    },
    {
      template: FeatureRoutesSuiteTemplate,
      fileName: path.join(featureDirectory, 'routes', 'index.tsx'),
      displayName: 'Suite Route Index',
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
      template: FeatureHookTemplate,
      fileName: path.join(featureDirectory, 'api', `use${depluraledName}.ts`),
      displayName: 'Feature Hook File',
    },
  ];

  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName, isPlural = true }) => {
      const generatedFileName = typeof fileName === 'function' ? fileName(isPlural) : fileName;
      const generatedTemplate = displayName.includes('Page')
        ? template(isPlural)
        : displayName.includes('Hook')
        ? template(depluraledName)
        : template(formattedName);

      await SyLogger.generateAndLogFile(
        generatedFileName,
        generatedTemplate,
        templatesUsed,
        displayName,
        generatedFileName
      );
    })
  );
}
