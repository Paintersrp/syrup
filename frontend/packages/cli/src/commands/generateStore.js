import { STORES_DIR } from '../../config.js';
import { SyAlter, SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateStore(storeName) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(storeName);
    const formattedName = SyAlter.capFirst(validatedName);
    const lowercaseName = validatedName.toLowerCase();

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    await generator.ensureAndLogDir(STORES_DIR);
    await queuer.queueStoreFile(formattedName, lowercaseName, STORES_DIR);

    const templatesUsed = await generator.generateQueue(templatesUsed);
    SyLog.logStats(templatesUsed);
  });
}
