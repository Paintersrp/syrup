import path from 'path';

import { ComponentFullTemplate } from '../templates/componentFull.js';
import { ComponentStorybookTemplate } from '../templates/componentStorybook.js';
import { ComponentTestTemplate } from '../templates/componentTest.js';
import { SyLogger } from '../utils/SyLogger.js';

/**
 * Generates component files based on the provided template and file names.
 * @param {string} formattedName - The formatted name of the component.
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {string} componentDirectory - The directory path where the files will be generated.
 * @returns {Promise<void>}
 */
export async function genComponentFiles(formattedName, templatesUsed, componentDirectory) {
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
      template: ComponentStorybookTemplate(formattedName),
      fileName: `${formattedName}.stories.tsx`,
      displayName: 'Storybook File',
    },
    {
      template: ComponentTestTemplate(formattedName),
      fileName: `${formattedName}.test.tsx`,
      displayName: 'Test File',
    },
  ];

  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName }) => {
      await SyLogger.generateAndLogFile(
        path.join(componentDirectory, fileName),
        template,
        templatesUsed,
        displayName,
        fileName
      );
    })
  );
}
