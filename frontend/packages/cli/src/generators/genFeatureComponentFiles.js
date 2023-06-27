import path from 'path';

import { ComponentBasicTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';

export async function genFeatureComponentFiles(
  featureDirectory,
  formattedName,
  generatedFiles,
  componentCount,
  componentImports
) {
  await Promise.all(
    Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
      const componentName = `${formattedName}Gen${i}`;
      componentImports.push(`import { ${componentName} } from './${componentName}';`);

      await generateFile(
        path.join(featureDirectory, 'components', `${componentName}.tsx`),
        ComponentBasicTemplate(componentName),
        generatedFiles
      );
    })
  );
}
