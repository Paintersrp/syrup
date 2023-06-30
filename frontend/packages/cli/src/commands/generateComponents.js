import path from 'path';

import { COMPONENTS_DIR } from '../../config.js';
import { promptSubdirectory } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateComponents(componentNames) {
  await SyErr.handle(async () => {
    const componentData = [];

    // Generate prompt answers first to allow logging everything together
    for (const name of componentNames) {
      const validatedName = SyVal.name(name);
      const subdirectory = await promptSubdirectory(validatedName);
      componentData.push({ name: validatedName, subdirectory });
    }

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    for (const data of componentData) {
      const formattedName = SyAlter.capFirst(data.name);
      const componentDirectory = path.join(COMPONENTS_DIR, data.subdirectory, formattedName);

      await generator.ensureAndLogDir(componentDirectory);
      await queuer.queueComponentFiles(formattedName, componentDirectory);
    }

    const templatesUsed = await generator.generateQueue(templatesUsed);
    SyLog.logStats(templatesUsed);
  });
}
