import path from 'path';

import { HookTemplate, PageTemplate } from '../template/shared.js';
import { IndexHookSuiteTemplate, IndexSuiteTemplate, RouteTemplate } from '../template/suite.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genSuiteFiles(
  featureDirectory,
  formattedName,
  depluraledName,
  generatedFiles
) {
  // Array of files to be made
  // Each Returns:
  //     template: Template file to be used
  //     fileName: Sets the file path/file name
  //         isPlural prop helps create two different Pages
  //
  //     displayName: Display name for Logger feedback
  const fileTemplates = [
    {
      template: (isPlural) => PageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File #1',
      isPlural: false,
    },
    {
      template: (isPlural) => PageTemplate(isPlural ? depluraledName : formattedName),
      fileName: (isPlural) =>
        path.join(featureDirectory, 'routes', `${isPlural ? depluraledName : formattedName}.tsx`),
      displayName: 'Page File #2',
      isPlural: true,
    },
    {
      template: RouteTemplate,
      fileName: path.join(featureDirectory, 'routes', 'index.tsx'),
      displayName: 'Route Index',
    },
    {
      template: IndexSuiteTemplate,
      fileName: path.join(featureDirectory, 'index.ts'),
      displayName: 'Feature Index',
    },
    {
      template: IndexHookSuiteTemplate,
      fileName: path.join(featureDirectory, 'api', 'index.ts'),
      displayName: 'API Index',
    },
    {
      template: HookTemplate,
      fileName: path.join(featureDirectory, 'api', `use${depluraledName}.ts`),
      displayName: 'Hook File #2',
    },
  ];

  // Generate files and log success or fail
  await Promise.all(
    fileTemplates.map(async ({ template, fileName, displayName, isPlural = true }) => {
      try {
        const generatedFileName = typeof fileName === 'function' ? fileName(isPlural) : fileName;
        const generatedTemplate = displayName.includes('Page')
          ? template(isPlural)
          : displayName.includes('Hook')
          ? template(depluraledName)
          : template(formattedName);

        await generateFile(generatedFileName, generatedTemplate, generatedFiles);
        Logger.log(`✔ Generated ${displayName}: ${generatedFileName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate ${displayName}: ${path.basename(fileName)}`);
        Logger.error(error);
      }
    })
  );
}
