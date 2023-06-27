import path from 'path';

import { ComponentBasicTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genFeatureComponentFiles(
  featureDirectory,
  formattedName,
  generatedFiles,
  componentCount,
  componentImports
) {
  await Promise.all(
    Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
      // Generate imports to be pushed to Component index
      const componentName = `${formattedName}Gen${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      // Generate file and log success or fail
      try {
        await generateFile(
          path.join(featureDirectory, 'components', `${componentName}.tsx`),
          ComponentBasicTemplate(componentName),
          generatedFiles
        );
        Logger.log(`✔ Generated Component #${i}: ${componentName}`, 'success');
      } catch (error) {
        Logger.error(`Failed to generate component: ${componentName}`);
        Logger.error(error);
      }
    })
  );

  // Generate the component folder index file with component imports
  const indexFilePath = path.join(featureDirectory, 'components', 'index.ts');
  const componentImportsContent = componentImports.join('\n');
  await generateFile(indexFilePath, componentImportsContent, generatedFiles);
  Logger.log(`✔ Generated Component Index: ${indexFilePath}`, 'success');
}
