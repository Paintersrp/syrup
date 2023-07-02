import { HOOKS_DIR } from '../../config.js';
import { SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * @description
 * Generate a hook based on the provided hook name.
 *
 * @param {string} hookName - The name of the hook.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
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
