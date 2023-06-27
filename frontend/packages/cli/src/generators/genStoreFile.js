import path from 'path';

import { StoreTemplate } from '../template/store.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genStoreFile(
  lowercaseName,
  formattedName,
  generatedFiles,
  componentDirectory
) {
  const fileName = `${lowercaseName}.tsx`;

  // Generate file and log success or fail
  try {
    await generateFile(
      path.join(componentDirectory, fileName),
      StoreTemplate(formattedName, lowercaseName),
      generatedFiles
    );
    Logger.log(`✔ Generated Store File: ${fileName}`, 'success');
  } catch (error) {
    Logger.error(`Failed to generate store file: ${fileName}`);
    Logger.error(error);
  }
}
