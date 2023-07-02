import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { promptSubdirectory } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

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
  await SyErr.handle(async () => {
    const generator = new SyGen();
    const queuer = new SyQue(generator);

    for (const name of componentNames) {
      await setupComponent(name, generator, queuer);
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
 * @param {SyQue} queuer - The queuer instance.
 * @returns {Promise<void>}
 *
 * @async
 */
export async function setupComponent(componentName, generator, queuer) {
  const validatedName = SyVal.name(componentName);
  const subdirectory = await promptSubdirectory(validatedName);
  const formattedName = SyAlter.capFirst(validatedName);

  const subDir = path.join(COMPONENTS_DIR, subdirectory);
  await generator.ensureAndLogDir(subDir);

  const componentDir = path.join(subDir, formattedName);
  await generator.ensureAndLogDir(componentDir);

  await queuer.queueComponentFiles(formattedName, componentDir);
}
