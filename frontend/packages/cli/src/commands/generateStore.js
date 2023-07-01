import { STORES_DIR } from '../../config.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * Generate scaffolding for a Zustand store based on the provided store name.
 *
 * @param {string} storeName - The name of the store.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates scaffolding for a Zustand store based on the provided store name.
 * Zustand is a minimalistic state management library for React applications.
 *
 * The function performs the following steps:
 *
 * - Validates the store name using the SyVal class.
 * - Transforms the validated name to a formatted name with the first letter capitalized and a lowercase name.
 * - Creates instances of the SyGen and SyQue classes as the generator and queuer, respectively.
 * - Uses the generator's ensureAndLogDir method to ensure the existence of the STORES_DIR directory and log the operation.
 * - Uses the queuer's queueStoreFile method to queue the store file based on the formatted name, lowercase name, and STORES_DIR.
 * - Calls the generator's generateQueue method to generate the queued files.
 *   The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 */
export async function generateStore(storeName) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(storeName);
    const formattedName = SyAlter.capFirst(validatedName);
    const lowercaseName = validatedName.toLowerCase();

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    await generator.ensureAndLogDir(STORES_DIR);
    await queuer.queueStoreFile(formattedName, lowercaseName, STORES_DIR);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
