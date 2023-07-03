import { promptComponentCount, promptFeatureType } from '../prompts/index.js';
import { queueFeature } from '../queue/queueFeature.js';
import { handleFunction } from '../utils/error.js';
import { SyGen, SyLog } from '../utils/index.js';
import { validateName } from '../utils/validate.js';

/**
 * @description
 * Generate files for a feature based on the provided feature name and command options.
 *
 * @param {string} featureName - The name of the feature.
 * @param {object} cmd - The command options.
 *   @property {string} [cmd.type] - The type of the feature. Valid values are 'Individual' or 'Suite'.
 *   @property {number} [cmd.count] - The number of components to generate for the feature.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
 */
export async function generateFeature(featureName, cmd) {
  await handleFunction(async () => {
    const validatedName = validateName(featureName);
    const { type, count } = cmd;

    const featureType = type || (await promptFeatureType());
    const componentCount = count || (await promptComponentCount());

    const generator = new SyGen();

    await queueFeature(validatedName, featureType, componentCount, generator);
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
