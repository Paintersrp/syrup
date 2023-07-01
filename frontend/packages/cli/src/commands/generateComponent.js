import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { promptSubdirectory } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * Generate a component based on the provided component name.
 *
 * @param {string} componentName - The name of the component.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates a component based on the provided component name.
 * It performs the following steps:
 *
 * - Creates instances of the SyGen and SyQue classes as the generator and queuer, respectively.
 * - Calls the encapsulated `setupComponent` function to handle the component setup process,
 *   passing the component name, generator, and queuer as arguments.
 * - Generates the queued files using the generator's generateQueue method.
 *   The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 *
 * The function utilizes various utility classes and functions including SyAlter, SyErr, SyGen, SyLog, SyQue, and SyVal.
 * Make sure to import the required dependencies and configurations before using this function.
 */
export async function generateComponent(componentName) {
  await SyErr.handle(async () => {
    const generator = new SyGen();
    const queuer = new SyQue(generator);

    setupComponent(componentName, generator, queuer);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}

/**
 * Handles the setup process for generating a component.
 *
 * @param {string} componentName - The name of the component.
 * @param {SyGen} generator - The generator instance.
 * @param {SyQue} queuer - The queuer instance.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function handles the setup process for generating a component based on the provided component name.
 * It performs the following steps:
 *
 * - Validates the component name using the SyVal class.
 * - Prompts the user to select an existing subdirectory from the components directory or enter a new subdirectory name.
 * - Constructs the formatted name by capitalizing the validated component name using the SyAlter class.
 * - Constructs the component directory by joining the selected subdirectory, formatted name,
 *   and the COMPONENTS_DIR constant.
 * - Ensures the existence of the selected subdirectory and component directory using the generator's ensureAndLogDir method,
 *   and logs the operation.
 * - Queues the component files based on the formatted name and component directory using the queuer's queueComponentFiles method.
 *
 * The function is called by the `generateComponent` function and encapsulates the component setup process
 * to improve code organization and reusability.
 * Ensure that the `generator` and `queuer` instances are already created before calling this function.
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
