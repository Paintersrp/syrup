import { STORES_DIR } from '../../config.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * @description
 * Generate scaffolding for a Zustand store based on the provided store name.
 *
 * @param {string} storeName - The name of the store.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
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
