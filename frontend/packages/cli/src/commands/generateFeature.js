import path from 'path';

import { FEATURES_DIR, FEATURE_SUBDIRS } from '../../config.js';
import { promptComponentCount, promptFeatureType } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyVal } from '../utils/index.js';
import { SyQue } from '../utils/SyQue.js';

export async function generateFeature(featureName, cmd) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(featureName);
    const { type, count } = cmd;

    const featureType = type || (await promptFeatureType());
    const componentCount = count || (await promptComponentCount());

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    const featureDirectory = path.join(FEATURES_DIR, validatedName);
    await generator.ensureAndLogDir(featureDirectory);

    const formattedName = SyAlter.capFirst(featureName);
    const singularName = SyAlter.deplural(formattedName);

    FEATURE_SUBDIRS.map(async (subdir) => {
      await generator.ensureAndLogDir(path.join(featureDirectory, subdir));
    });

    if (featureType === 'Individual') {
      await queuer.queueIndividualFeatureFiles(formattedName, featureDirectory);
    }

    if (featureType === 'Suite') {
      await queuer.queueSuiteFeatureFiles(formattedName, singularName, featureDirectory);
    }

    await queuer.queueSharedFeatureFiles(formattedName, featureDirectory, componentCount);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
