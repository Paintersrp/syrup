import { HOOKS_DIR } from '../../config.js';
import { SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * Generate a hook based on the provided hook name.
 *
 * @param {string} hookName - The name of the hook.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates a hook based on the provided hook name.
 * It performs the following steps:
 *
 * - Validates the hook name using the SyVal class.
 * - Creates instances of the SyGen and SyQue classes as the generator and queuer, respectively.
 * - Uses the generator's ensureAndLogDir method to ensure the existence of the HOOKS_DIR directory and log the operation.
 * - Uses the queuer's queueHookFile method to queue the hook file based on the validated hook name and HOOKS_DIR.
 * - Calls the generator's generateQueue method to generate the queued files.
 *   The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 */
export async function generateHook(hookName) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(hookName);

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    await generator.ensureAndLogDir(HOOKS_DIR);
    await queuer.queueHookFile(validatedName, HOOKS_DIR);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
