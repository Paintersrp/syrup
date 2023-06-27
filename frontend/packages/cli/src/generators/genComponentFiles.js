import path from 'path';
import {
  ComponentFullTemplate,
  ComponentStoriesTemplate,
  ComponentTestTemplate,
} from '../template/component.js';

import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genComponentFiles(formattedName, generatedFiles, componentDirectory) {
  // Array of files to be made
  // Each Returns:
  //     template: Template file to be used
  //     fileName: Sets the file path/file name
  //     displayName: Display name for Logger feedback
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

  // Generate files and log success or fail
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
