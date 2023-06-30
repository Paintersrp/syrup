import path from 'path';
import { INCLUDE_STORIES, INCLUDE_TESTS } from '../../config.js';
import {
  ComponentFullTemplate,
  ComponentStorybookTemplate,
  ComponentTestTemplate,
} from '../templates/index.js';

/**
 * Builds component files for the specified component name and subdirectory.
 *
 * @param {Array} templatesUsed - An array to store the generated file paths.
 * @param {string} componentName - The name of the component to build.
 * @param {string} subdirectory - The subdirectory where the component will be created.
 * @returns {Promise<void>} A promise that resolves when the component files are built.
 */
async function buildComponentFiles(generator, formattedName, componentDirectory) {
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
}

export { buildComponentFiles };
