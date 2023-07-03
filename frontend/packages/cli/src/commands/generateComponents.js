import path from 'path';

import { promptSubdirectory } from '../prompts/index.js';
import { queueComponents } from '../queue/queueComponents.js';
import { handleFunction } from '../utils/error.js';
import { capFirst } from '../utils/format.js';
import { getPaths } from '../utils/getPaths.js';
import { SyGen, SyLog } from '../utils/index.js';
import { validateName } from '../utils/validate.js';

/**
 * @description
 * Generate components based on the provided component names.
 *
 * @param {string[]} componentNames - An array of component names.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
 */
export async function generateComponents(componentNames) {
  await handleFunction(async () => {
    const generator = new SyGen();

    for (const name of componentNames) {
      await setupComponent(name, generator);
    }

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}

/**
 * @description
 * Handles the setup process for generating a component based on the provided component name.
 *
 * @param {string} componentName - The name of the component.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 *
 * @async
 */
export async function setupComponent(componentName, generator) {
  const validatedName = validateName(componentName);
  const subdirectory = await promptSubdirectory(validatedName);
  const formattedName = capFirst(validatedName);
  const paths = getPaths();

  const subDir = path.join(paths.web.src.components.abs, subdirectory);
  await generator.ensureAndLogDir(subDir);

  const componentDir = path.join(subDir, formattedName);
  await generator.ensureAndLogDir(componentDir);

  await queueComponents(formattedName, componentDir, generator);
}
