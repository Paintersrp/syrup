import fs from 'fs-extra';
import { execSync } from 'child_process';

import { handleFunction } from '../utils/error.js';
import { getPaths } from '../utils/getPaths.js';

/**
 * @description
 * Generate an endpoint by creating a Django app and updating the settings.py file.
 *
 * @param {string} app_name - The name of the Django app to be generated.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
 */
export async function generateEndpoint(app_name) {
  await handleFunction(async () => {
    const paths = getPaths();

    execSync(`python manage.py startapp ${app_name}`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });

    const settingsPath = `${paths.api.api}/settings.py`;
    const settingsContent = fs.readFileSync(settingsPath, 'utf8');
    const appPattern = `\\b${app_name}\\b`;

    // Regex to find INSTALLED_APPS in settings.py
    const installedAppsPattern = /INSTALLED_APPS\s*=\s*\[(?:[^\]]+\[[^\]]+\]|[^\]]+)]/s;
    const installedAppsMatch = settingsContent.match(installedAppsPattern);

    if (installedAppsMatch) {
      const installedAppsList = installedAppsMatch[0];

      if (!installedAppsList.includes(appPattern)) {
        const updatedInstalledAppsList = installedAppsList.replace(
          /(\[|\])\s*$/, // Remove trailing comma and whitespace
          `    "${app_name}",\n$1`
        );

        const updatedSettingsContent = settingsContent.replace(
          installedAppsPattern,
          updatedInstalledAppsList
        );

        fs.writeFileSync(settingsPath, updatedSettingsContent, 'utf8');
      } else {
        console.log(`App '${app_name}' is already included in INSTALLED_APPS.`);
      }
    } else {
      throw new Error('INSTALLED_APPS not found in settings.py');
    }
  });
}
