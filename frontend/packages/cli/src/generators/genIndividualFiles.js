import path from 'path';

import { IndexBasicTemplate } from '../templates/indexBasic.js';
import { IndexHookIndividualTemplate } from '../templates/indexHook.js';
import { FeatureRoutesIndividualTemplate } from '../templates/featureRoutesIndividual.js';
import { FeaturePageTemplate } from '../templates/featurePage.js';
import { SyLogger } from '../utils/SyLogger.js';

/**
 * Generates individual feature files for a given feature directory and formatted name.
 *
 * @param {string} featureDirectory - The directory where the feature files will be generated.
 * @param {string} formattedName - The formatted name used for the feature files.
 * @param {string[]} templatesUsed - An array to store the paths of the generated files.
 * @returns {Promise<void>} A promise that resolves when the individual feature file generation is complete.
 */
export async function genIndividualFiles(featureDirectory, formattedName, templatesUsed) {
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
      template: FeaturePageTemplate(formattedName),
      fileName: path.join(featureDirectory, 'routes', `${formattedName}.tsx`),
      displayName: 'Page File',
    },
    {
      template: FeatureRoutesIndividualTemplate(formattedName),
      fileName: path.join(featureDirectory, 'routes', 'index.ts'),
      displayName: 'Individual Route Index',
    },
    {
      template: IndexBasicTemplate(formattedName),
      fileName: path.join(featureDirectory, 'index.ts'),
      displayName: 'Feature Index',
    },
    {
      template: IndexHookIndividualTemplate(formattedName),
      fileName: path.join(featureDirectory, 'api', 'index.ts'),
      displayName: 'API Index',
    },
  ];

  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName }) => {
      await SyLogger.generateAndLogFile(fileName, template, templatesUsed, displayName, fileName);
    })
  );
}
