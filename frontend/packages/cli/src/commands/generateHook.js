import { HOOKS_DIR } from '../../config.js';
import { SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateHook(hookName) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(hookName);

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    await generator.ensureAndLogDir(HOOKS_DIR);
    await queuer.queueHookFile(validatedName, HOOKS_DIR);

    const templatesUsed = await generator.generateQueue(templatesUsed);
    SyLog.logStats(templatesUsed);
  });
}
