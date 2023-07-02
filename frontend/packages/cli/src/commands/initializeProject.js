import path from 'path';

import { COMPONENTS_DIR, SOURCE_DIR } from '../../config.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue } from '../utils/index.js';

/**
 * @description
 * Initializes the project by generating the necessary scaffolding and files.
 *
 * @throws {Error} If an error occurs during the initialization process.
 * @returns {Promise<void>}
 * @async
 */
export async function initializeProject() {
  await SyErr.handle(async () => {
    const generator = new SyGen();
    const queuer = new SyQue(generator);

    const dirsWithIndex = ['hooks', 'providers', 'theme', 'types', 'utils'];
    const dirsWithOutIndex = ['components', 'features', 'lib', 'routes', 'stores'];

    // Queue project directories and index files
    const projectDirectories = [...dirsWithIndex, ...dirsWithOutIndex];

    await Promise.all(
      projectDirectories.map(async (directory) => {
        const dirPath = path.join(SOURCE_DIR, directory);
        await generator.ensureAndLogDir(dirPath);

        const formattedSubdirName = SyAlter.capFirst(directory);
        const generateIndex = dirsWithIndex.includes(directory);

        if (generateIndex) {
          const indexContent =
            directory === 'types' ? 'export type GenericMapping = { [key: string]: any };' : '';
          const indexPath = path.join(dirPath, 'index.ts');
          await generator.addFileToQueue(indexContent, indexPath, formattedSubdirName);
        }
      })
    );

    // Queue base component subdirectories and placeholder component files
    const componentSubdir = ['Elements', 'Layout', 'Form', 'Containers', 'Animations'];
    const placeholderName = 'Placeholder';

    await Promise.all(
      componentSubdir.map(async (directory) => {
        const dirPath = path.join(COMPONENTS_DIR, directory);
        await generator.ensureAndLogDir(dirPath);

        const compPath = path.join(dirPath, placeholderName);
        await generator.ensureAndLogDir(compPath);

        await queuer.queueComponentFiles(placeholderName, compPath);
      })
    );

    // Queue initial src/lib files
    await queuer.queueInitLib(SOURCE_DIR);

    // Queue initial theme files
    const themeDir = path.join(SOURCE_DIR, 'theme');
    await queuer.queueInitTheme(themeDir);

    // Queue initial provider files
    const providersDir = path.join(SOURCE_DIR, 'providers');
    await queuer.queueInitProviders(providersDir);

    // Process and generate queue
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
