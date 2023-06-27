import path from 'path';

import { ComponentBasicTemplate, HookTemplate, IndexTypesTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';

export async function genSharedFiles(
  featureDirectory,
  formattedName,
  generatedFiles,
  componentCount,
  componentImports
) {
  await Promise.all(
    Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
      const componentName = `${formattedName}${i}`;
      componentImports.push(`import { ${componentName} } from './${componentName}';`);

      await generateFile(
        path.join(featureDirectory, 'components', `${componentName}.tsx`),
        ComponentBasicTemplate(componentName),
        generatedFiles
      );
    })
  );

  await Promise.all([
    generateFile(
      path.join(featureDirectory, 'components', 'index.ts'),
      componentImports.join('\n'),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'api', `use${formattedName}.ts`),
      HookTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'types', 'index.ts'),
      IndexTypesTemplate(formattedName),
      generatedFiles
    ),
  ]);
}
