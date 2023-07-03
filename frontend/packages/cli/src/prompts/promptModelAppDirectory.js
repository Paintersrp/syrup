import inquirer from 'inquirer';
import fs from 'fs-extra';

/**
 * @description
 * Prompts the user to choose a model name from the existing model directories.
 *
 * @returns {Promise<string>} - The selected model name.
 * @async
 */
export async function promptModelAppDirectory(apiDir) {
  const appOptions = getAppOptions(apiDir);
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'appDir',
        message: 'Select the target app:',
        choices: appOptions,
      },
    ])
    .then((answers) => answers.appDir);
}

// encapsulate?
function getAppOptions(directory) {
  const appDirs = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return appDirs;
}
