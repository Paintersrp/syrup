import path from 'path';

import { INCLUDE_STORIES, INCLUDE_TESTS } from '../../config.js';
import {
  ComponentFullTemplate,
  ComponentStorybookTemplate,
  ComponentTestTemplate,
} from '../templates/index.js';
import { SyGenerator } from '../utils/SyGenerator.js';

/**
 * Generates component files based on the provided template and file names.
 * @param {string} formattedName - The formatted name of the component.
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {string} componentDirectory - The directory path where the files will be generated.
 * @returns {Promise<void>}
 */
export async function genComponentFiles(formattedName, templatesUsed, componentDirectory) {
  const generator = new SyGenerator();

  generator.addFileTemplate(
    ComponentFullTemplate(formattedName),
    path.join(componentDirectory, `${formattedName}.tsx`),
    'Component File'
  );

  if (INCLUDE_STORIES) {
    generator.addFileTemplate(
      ComponentStorybookTemplate(formattedName),
      path.join(componentDirectory, `${formattedName}.stories.tsx`),
      'Storybook File'
    );
  }

  if (INCLUDE_TESTS) {
    generator.addFileTemplate(
      ComponentTestTemplate(formattedName),
      path.join(componentDirectory, `${formattedName}.test.tsx`),
      'Test File'
    );
  }

  await generator.generateManyFiles(templatesUsed);
}
