import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { promptSubdirectory } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateComponent(componentName) {
  await SyErr.handle(async () => {
    const generator = new SyGen();
    const queuer = new SyQue(generator);

    const validatedName = SyVal.name(componentName);
    const subdirectory = await promptSubdirectory(validatedName);

    const formattedName = SyAlter.capFirst(componentName);
    const componentDirectory = path.join(COMPONENTS_DIR, subdirectory, formattedName);

    await generator.ensureAndLogDir(componentDirectory);
    await queuer.queueComponentFiles(formattedName, componentDirectory);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
