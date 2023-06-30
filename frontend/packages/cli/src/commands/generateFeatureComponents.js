import path from 'path';

import { FEATURES_DIR } from '../../config.js';
import { promptComponentCount, promptFeatureName } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateFeatureComponents(cmd) {
  await SyErr.handle(async () => {
    const { name, count } = cmd;
    const featureName = name || (await promptFeatureName());
    const validatedName = SyVal.name(featureName);
    const componentCount = count || (await promptComponentCount());

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    const featureDirectory = path.join(FEATURES_DIR, validatedName);
    const formattedName = SyAlter.capFirst(validatedName);

    await generator.ensureAndLogDir(featureDirectory);
    await queuer.queueFeatureComponentFiles(formattedName, featureDirectory, componentCount);

    const templatesUsed = await generator.generateQueue(templatesUsed);
    SyLog.logStats(templatesUsed);
  });
}
