import path from 'path';

import { FEATURES_DIR } from '../../config.js';
import { promptComponentCount, promptFeatureName } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * @description
 * Generate files for feature components based on the provided command options.
 *
 * @param {object} cmd - The command options.
 *   @property {string} [cmd.name] - The name of the feature. If not provided, the function will prompt the user to enter the feature name.
 *   @property {number} [cmd.count] - The number of components to generate for the feature.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
 */
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
    const templatesUsed = await generator.generateQueue();

    SyLog.logStats(templatesUsed);
  });
}
