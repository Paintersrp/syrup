import path from 'path';

import { AppHookTemplate } from '../template/hook.js';
import { generateFile } from '../utils/generateFile.js';
import { Logger } from '../utils/logger.js';

export async function genHookFile(formattedName, generatedFiles, componentDirectory) {
  const fileName = `${formattedName}.tsx`;

  // Generate file and log success or fail
  try {
    await generateFile(
      path.join(componentDirectory, fileName),
      AppHookTemplate(formattedName),
      generatedFiles
    );
    Logger.log(`✔ Generated Hook File: ${fileName}`, 'success');
  } catch (error) {
    Logger.error(`Failed to generate hook file: ${fileName}`);
    Logger.error(error);
  }
}
