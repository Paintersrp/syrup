import path from 'path';

import {
  IndexBasicTemplate,
  IndexHookIndividualTemplate,
  IndexIndividualTemplate,
} from '../template/individual.js';
import { PageTemplate } from '../template/shared.js';
import { generateFile } from '../utils/generateFile.js';

export async function genIndividualFiles(featureDirectory, formattedName, generatedFiles) {
  await Promise.all([
    generateFile(
      path.join(featureDirectory, 'routes', `${formattedName}.tsx`),
      PageTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'routes', 'index.ts'),
      IndexIndividualTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'index.ts'),
      IndexBasicTemplate(formattedName),
      generatedFiles
    ),
    generateFile(
      path.join(featureDirectory, 'api', 'index.ts'),
      IndexHookIndividualTemplate(formattedName),
      generatedFiles
    ),
  ]);
}
