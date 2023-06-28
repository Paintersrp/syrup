import path from 'path';
import {
  ComponentFullTemplate,
  ComponentStoriesTemplate,
  ComponentTestTemplate,
} from '../template/component.js';

import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates component files based on the provided template and file names.
 * @param {string} formattedName - The formatted name of the component.
 * @param {Array} generatedFiles - An array to store the generated file paths.
 * @param {string} componentDirectory - The directory path where the files will be generated.
 * @returns {Promise<void>}
 */
export async function genComponentFiles(formattedName, generatedFiles, componentDirectory) {
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
      template: ComponentFullTemplate(formattedName),
      fileName: `${formattedName}.tsx`,
      displayName: 'Component File',
    },
    {
      template: ComponentStoriesTemplate(formattedName),
      fileName: `${formattedName}.stories.tsx`,
      displayName: 'Storybook File',
    },
    {
      template: ComponentTestTemplate(formattedName),
      fileName: `${formattedName}.test.tsx`,
      displayName: 'Test File',
    },
  ];

  /**
   * Generate files and log success or fail.
   */
  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName }) => {
      try {
        await generateFile(path.join(componentDirectory, fileName), template, generatedFiles);
        Logger.log(`✔ Generated ${displayName}: ${fileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate ${displayName}: ${path.basename(fileName)}`);
        Logger.error(error);
      }
    })
  );
}
