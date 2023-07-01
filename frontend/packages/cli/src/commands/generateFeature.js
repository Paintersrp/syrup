import { promptComponentCount, promptFeatureType } from '../prompts/index.js';
import { SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * Generate files for a feature based on the provided feature name and command options.
 *
 * @param {string} featureName - The name of the feature.
 * @param {object} cmd - The command options.
 *   @property {string} [cmd.type] - The type of the feature. Valid values are 'Individual' or 'Suite'.
 *   @property {number} [cmd.count] - The number of components to generate for the feature.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates files for a feature based on the provided feature name and command options.
 * It first validates the feature name and retrieves the type and count from the command options.
 *
 * The command options allow customization of the generation process:
 *   - `type`: Specifies the type of the feature. If not provided, the function will prompt the user
 *             to select the feature type. Valid values are 'Individual' or 'Suite'.
 *   - `count`: Specifies the number of components to generate for the feature. If not provided,
 *              the function will prompt the user to enter the component count.
 *
 * The function creates an instance of the SyGen class as the generator and SyQue class as the queuer.
 * It then uses the queuer to queue the feature files based on the feature name, type, and component count.
 *
 * After queuing the files, it calls the generator's generateQueue method to generate the queued files.
 * The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
 */
export async function generateFeature(featureName, cmd) {
  await SyErr.handle(async () => {
    const validatedName = SyVal.name(featureName);
    const { type, count } = cmd;

    const featureType = type || (await promptFeatureType());
    const componentCount = count || (await promptComponentCount());

    const generator = new SyGen();
    const queuer = new SyQue(generator);

    await queuer.queueFeature(validatedName, featureType, componentCount);
    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
