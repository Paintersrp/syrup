import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

import { handleFunction } from '../utils/error.js';
import { capFirst } from '../utils/format.js';
import { getPaths, PROJECT_DIRS, PROJECT_DIRS_WITH_INDEX } from '../utils/getPaths.js';
import { queueComponents, queueHook, queueStore } from '../queue/index.js';
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

    execSync(`npm create vite@latest web -- --template react-ts`, {
      stdio: 'inherit',
    });

    execSync(`django-admin startproject api`, {
      stdio: 'inherit',
    });

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
          const indexPath = path.join(dirPath, 'index.ts');
          await generator.addFileToQueue('', indexPath, formattedSubdirName);
        }
      })
    );

    // Queue base component subdirectories and placeholder component files
    const placeholderName = 'Placeholder';

    await Promise.all(
      Array.from({ length: 1 }).map(async (_, index) => {
        const dirPath = paths.web.src.components.abs;
        const compPath = path.join(dirPath, `${placeholderName}${index + 1}`);
        await generator.ensureAndLogDir(compPath);
        await queueComponents(`${placeholderName}${index + 1}`, compPath, generator);
      })
    );

    // Queue initial placeholder hooks
    await queueHook('usePlaceholder', paths.web.src.hooks, generator);

    // Queue initial placeholder store files
    await queueStore('Placeholder', 'placeholder', paths.web.src.stores, generator);

    // Process and generate queue
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);

    execSync(`python manage.py startapp authorization`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });

    execSync(`python manage.py startapp home`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });

    const staticTemplatesUrl = new URL('../templates/static', import.meta.url);
    const staticTemplatesPath = fileURLToPath(staticTemplatesUrl);
    fs.copySync(staticTemplatesPath, paths.abs);

    execSync(`npm install`, {
      stdio: 'inherit',
      cwd: paths.web.abs,
    });

    execSync(`python manage.py makemigrations`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });

    execSync(`python manage.py migrate`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });

    execSync(`python manage.py createsuperuser`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });
  });
}
