import path from 'path';
import {
  ComponentFullTemplate,
  ComponentStoriesTemplate,
  ComponentTestTemplate,
} from '../template/component.js';
import { CLIError } from '../utils/errors.js';

import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genComponentFiles(formattedName, generatedFiles, componentDirectory) {
  const fileTemplates = [
    {
      template: ComponentFullTemplate(formattedName),
      fileName: `${formattedName}.tsx`,
      displayName: 'Component file',
    },
    {
      template: ComponentStoriesTemplate(formattedName),
      fileName: `${formattedName}.stories.tsx`,
      displayName: 'Stories file',
    },
    {
      template: ComponentTestTemplate(formattedName),
      fileName: `${formattedName}.test.tsx`,
      displayName: 'Test file',
    },
  ];

  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName }) => {
      try {
        await generateFile(path.join(componentDirectory, fileName), template, generatedFiles);
      } catch (error) {
        Logger.error(new CLIError(`Failed to generate ${displayName.toLowerCase()}: ${fileName}`));
        Logger.error(new CLIError(error));
      }
    })
  );
}
