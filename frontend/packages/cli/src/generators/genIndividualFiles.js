import path from 'path';

import {
  IndexBasicTemplate,
  IndexHookIndividualTemplate,
  IndexIndividualTemplate,
} from '../template/individual.js';
import { PageTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates individual feature files for a given feature directory and formatted name.
 *
 * @param {string} featureDirectory - The directory where the feature files will be generated.
 * @param {string} formattedName - The formatted name used for the feature files.
 * @param {string[]} generatedFiles - An array to store the paths of the generated files.
 * @returns {Promise<void>} A promise that resolves when the individual feature file generation is complete.
 */
export async function genIndividualFiles(featureDirectory, formattedName, generatedFiles) {
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
      template: PageTemplate(formattedName),
      fileName: path.join(featureDirectory, 'routes', `${formattedName}.tsx`),
      displayName: 'Page File',
    },
    {
      template: IndexIndividualTemplate(formattedName),
      fileName: path.join(featureDirectory, 'routes', 'index.ts'),
      displayName: 'Route Index',
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

  /**
   * Generate files and log success or fail.
   */
  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName }) => {
      try {
        await generateFile(fileName, template, generatedFiles);
        Logger.log(`✔ Generated ${displayName}: ${fileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate ${displayName}: ${path.basename(fileName)}`);
        Logger.error(error);
      }
    })
  );
}
