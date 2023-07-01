import path from 'path';

import { COMPONENTS_DIR, SOURCE_DIR } from '../../config.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue } from '../utils/index.js';

export async function initializeProject() {
  await SyErr.handle(async () => {
    const generator = new SyGen();
    const queuer = new SyQue(generator);

    const directories = [
      'components',
      'features',
      'hooks',
      'lib',
      'providers',
      'routes',
      'stores',
      'theme',
      'types',
      'utils',
    ];

    for (const directory of directories) {
      const dirPath = path.join(SOURCE_DIR, directory);
      await generator.ensureAndLogDir(dirPath);

      const formattedSubdirName = SyAlter.capFirst(directory) + ' Index';
      const generateIndex =
        directory !== 'components' &&
        directory !== 'features' &&
        directory !== 'routes' &&
        directory !== 'stores';

      if (generateIndex) {
        await generator.addFileToQueue('', path.join(dirPath, 'index.ts'), formattedSubdirName);
      }
    }

    const componentSubdir = ['Elements', 'Layout', 'Form', 'Containers', 'Animations'];

    for (const directory of componentSubdir) {
      const dirPath = path.join(COMPONENTS_DIR, directory);

      await generator.ensureAndLogDir(dirPath);
      await queuer.queueComponentFiles('Component', dirPath);
    }

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
