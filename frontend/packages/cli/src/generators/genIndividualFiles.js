import path from 'path';

import {
  IndexBasicTemplate,
  IndexHookIndividualTemplate,
  IndexIndividualTemplate,
} from '../template/individual.js';
import { PageTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genIndividualFiles(featureDirectory, formattedName, generatedFiles) {
  // Array of files to be made
  // Each Returns:
  //     template: Template file to be used
  //     fileName: Sets the file path/file name
  //     displayName: Display name for Logger feedback
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

  // Generate files and log success or fail
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
