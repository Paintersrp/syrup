import path from 'path';

import { HookTemplate, PageTemplate } from '../template/shared.js';
import { IndexHookSuiteTemplate, IndexSuiteTemplate, RouteTemplate } from '../template/suite.js';
import { generateFile } from '../utils/generateFile.js';

export async function genSuiteFiles(
  featureDirectory,
  formattedName,
  depluraledName,
  generatedFiles
) {
  await Promise.all([
    generateFile(
      path.join(featureDirectory, 'routes', `${formattedName}.tsx`),
      PageTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'routes', `${depluraledName}.tsx`),
      PageTemplate(formattedName, true),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'routes', 'index.tsx'),
      RouteTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'index.ts'),
      IndexSuiteTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'api', 'index.ts'),
      IndexHookSuiteTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'api', `use${depluraledName}.ts`),
      HookTemplate(depluraledName),
      generatedFiles
    ),
  ]);
}
