import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { SyErr, SyGen, SyVal } from '../utils/index.js';

export async function generateDirectories(directoryNames) {
  await SyErr.handle(async () => {
    const validNames = directoryNames.filter(SyVal.directory);
    const generator = new SyGen();

    validNames.forEach((name) => {
      const dirPath = path.join(COMPONENTS_DIR, name);
      generator.ensureAndLogDir(dirPath);
    });
  });
}
