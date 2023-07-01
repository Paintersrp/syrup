import { SyErr, SyGen, SyLog, SyQue } from '../utils/index.js';
import { setupComponent } from './generateComponent.js';

/**
 * Generate components based on the provided component names.
 *
 * @param {string[]} componentNames - An array of component names.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates components based on the provided component names.
 * It receives an array of component names and performs the following steps:
 *
 * - Creates instances of the SyGen and SyQue classes as the generator and queuer, respectively.
 * - For each component name in `componentNames`, it calls the encapsulated `setupComponent` function to handle the component setup process.
 *   The `setupComponent` function takes the component name, generator, and queuer as arguments and performs the following steps:
 *   - Validates the component name using the SyVal class.
 *   - Prompts the user to select a subdirectory using the `promptSubdirectory` function.
 *   - Constructs the formatted name by capitalizing the validated name using the SyAlter class.
 *   - Constructs the component directory by joining the subdirectory, formatted name,
 *     and the COMPONENTS_DIR constant.
 *   - Ensures the existence of the component directory using the generator's `ensureAndLogDir` method and logs the operation.
 *   - Queues the component files based on the formatted name and component directory using the queuer's `queueComponentFiles` method.
 * - After queuing the files for each component, it calls the generator's `generateQueue` method to generate the queued files.
 *   The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 *
 * The function utilizes various utility classes and functions including SyAlter, SyErr, SyGen, SyLog, SyQue, and SyVal.
 * Make sure to import the required dependencies and configurations before using this function.
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
