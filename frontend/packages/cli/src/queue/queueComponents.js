import path from 'path';

import { INCLUDE_STORIES, INCLUDE_TESTS } from '../../config.js';
import {
  ComponentFullTemplate,
  ComponentStorybookTemplate,
  ComponentTestTemplate,
} from '../templates/index.js';

/**
 * @description
 * Queues the files for a component, including the component file, storybook file, and test file.
 *
 * @param {string} name - The name of the component.
 * @param {string} directory - The target directory for the component files.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueComponentFiles(name, directory, generator) {
  generator.addFileToQueue(
    ComponentFullTemplate(name),
    path.join(directory, `${name}.tsx`),
    'Component File'
  );

  if (INCLUDE_STORIES) {
    generator.addFileToQueue(
      ComponentStorybookTemplate(name),
      path.join(directory, `${name}.stories.tsx`),
      'Storybook File'
    );
  }

  if (INCLUDE_TESTS) {
    generator.addFileToQueue(
      ComponentTestTemplate(name),
      path.join(directory, `${name}.test.tsx`),
      'Test File'
    );
  }
}
