import path from 'path';
import { execSync } from 'child_process';

import { handleFunction } from '../utils/error.js';
import { capFirst } from '../utils/format.js';
import { getPaths, PROJECT_DIRS, PROJECT_DIRS_WITH_INDEX } from '../utils/getPaths.js';
import {
  queueComponents,
  queueFeature,
  queueHook,
  queueInitLib,
  queueInitProviders,
  queueInitRoutes,
  queueInitTheme,
  queueInitUtils,
  queueStore,
} from '../queue/index.js';
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
    execSync(`django-admin startproject api`, {
      stdio: 'inherit',
    });

    const generator = new SyGen();
    const paths = getPaths();

    await generator.ensureAndLogDir(paths.web.abs);
    await generator.ensureAndLogDir(paths.web.src.abs);

    // Queue project directories and index files
    await Promise.all(
      PROJECT_DIRS.map(async (directory) => {
        const dirPath =
          directory === 'components' ? paths.web.src[directory].abs : paths.web.src[directory];

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
      Object.entries(paths.web.src.components).map(async ([directory, dirPath]) => {
        if (directory === 'abs') {
          return;
        }
        await generator.ensureAndLogDir(dirPath);
        const compPath = path.join(dirPath, placeholderName);
        await generator.ensureAndLogDir(compPath);
        await queueComponents(placeholderName, compPath, generator);
      })
    );

    // Queue initial features and feature files
    await queueFeature('Suite', 'Suite', 3, generator);
    await queueFeature('Individual', 'Individual', 3, generator);

    // Queue initial features and feature files
    await queueHook('usePlaceholder', paths.web.src.hooks, generator);

    // Queue initial src/lib files
    await queueInitLib(paths.web.src.lib, generator);

    // Queue initial src/lib files
    await queueInitLib(paths.web.src.lib, generator);

    // Queue initial provider files
    await queueInitProviders(paths.web.src.providers, generator);

    // Queue initial routes files
    await queueInitRoutes(paths.web.src.routes, generator);

    // Queue initial store files
    await queueStore('Auth', 'auth', paths.web.src.stores, generator);
    await queueStore('Notifications', 'notifications', paths.web.src.stores, generator);

    // Queue initial theme files
    await queueInitTheme(paths.web.src.theme, generator);

    // Queue initial utils files
    await queueInitUtils(paths.web.src.utils, generator);

    // Admin?
    // Auth? + AuthProvider + Auth Feature

    // Component/Package Dependencies/NPM Install

    // Stock Home / Landing Page
    // Stock AppNavbar / Footer / Drawer
    // Button / Palette Demo

    // Route updating
    // Settings

    // More Utils? Format?

    // Process and generate queue
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
