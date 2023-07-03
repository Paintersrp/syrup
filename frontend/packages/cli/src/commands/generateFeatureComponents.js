import path from 'path';

import { promptComponentCount, promptFeatureName } from '../prompts/index.js';
import { queueFeatureComponents } from '../queue/queueFeatureComponents.js';
import { handleFunction } from '../utils/error.js';
import { capFirst } from '../utils/format.js';
import { getPaths, SyGen, SyLog } from '../utils/index.js';
import { validateName } from '../utils/validate.js';

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
  await handleFunction(async () => {
    const { name, count } = cmd;
    const featureName = name || (await promptFeatureName());
    const validatedName = validateName(featureName);
    const componentCount = count || (await promptComponentCount());

    const generator = new SyGen();
    const paths = getPaths();

    const featureDirectory = path.join(paths.web.src.features, validatedName);
    const formattedName = capFirst(validatedName);

    await generator.ensureAndLogDir(featureDirectory);

    await queueFeatureComponents(formattedName, featureDirectory, componentCount, generator);
    const templatesUsed = await generator.generateQueue();

    SyLog.logStats(templatesUsed);
  });
}
