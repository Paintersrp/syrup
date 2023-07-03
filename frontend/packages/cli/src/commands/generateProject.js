import path from 'path';
import { queueComponentFiles } from '../queue/queueComponents.js';
import {
  queueInitLib,
  queueInitProviders,
  queueInitRoutes,
  queueInitTheme,
  queueInitUtils,
} from '../queue/queueProjectInit.js';
import { handleFunction } from '../utils/error.js';
import { capFirst } from '../utils/format.js';
import { getPaths, PROJECT_DIRS, PROJECT_DIRS_WITH_INDEX } from '../utils/getPaths.js';
import { SyGen, SyLog } from '../utils/index.js';

/**
 * @description
 * Initializes the project by generating the necessary scaffolding and files.
 *
 * @throws {Error} If an error occurs during the initialization process.
 * @returns {Promise<void>}
 * @async
 */
export async function generateProject() {
  await handleFunction(async () => {
    const generator = new SyGen();
    const paths = getPaths();

    // Queue project directories and index files
    await Promise.all(
      PROJECT_DIRS.map(async (directory) => {
        const dirPath =
          directory === 'components' ? paths.src[directory].abs : paths.src[directory];

        await generator.ensureAndLogDir(dirPath);

        const formattedSubdirName = capFirst(directory);
        const generateIndex = PROJECT_DIRS_WITH_INDEX.includes(directory);

        if (generateIndex) {
          const indexContent =
            directory === 'types' ? 'export type GenericMapping = { [key: string]: any };' : '';
          const indexPath = path.join(dirPath, 'index.ts');
          await generator.addFileToQueue(indexContent, indexPath, formattedSubdirName);
        }
      })
    );

    // Queue base component subdirectories and placeholder component files
    const placeholderName = 'Placeholder';

    await Promise.all(
      Object.entries(paths.src.components).map(async ([directory, dirPath]) => {
        if (directory === 'abs') {
          return;
        }
        await generator.ensureAndLogDir(dirPath);
        const compPath = path.join(dirPath, placeholderName);
        await generator.ensureAndLogDir(compPath);
        await queueComponentFiles(placeholderName, compPath, generator);
      })
    );

    // Queue initial src/lib files
    await queueInitLib(paths.src.lib, generator);

    // Queue initial provider files
    await queueInitProviders(paths.src.providers, generator);

    // Queue initial routes files
    await queueInitRoutes(paths.src.routes, generator);

    // Queue initial theme files
    await queueInitTheme(paths.src.theme, generator);

    // Queue initial theme files
    await queueInitUtils(paths.src.utils, generator);

    // Admin
    // Hooks?
    // Stores?
    // Auth? + AuthProvider + Auth Feature
    // Component/Package Dependencies/NPM Install
    // Stock Home / Landing Page
    // Route updating
    // Settings
    // Stock AppNavbar / Footer / Drawer
    // Button / Palette Demo
    // More Utils? Format?

    // Process and generate queue
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
