import path from 'path';

import { FEATURES_DIR } from '../../config.js';
import { promptComponentCount, promptFeatureName } from '../prompts/index.js';
import { SyAlter, SyErr, SyGen, SyLog, SyQue, SyVal } from '../utils/index.js';

/**
 * Generate files for feature components based on the provided command options.
 *
 * @param {object} cmd - The command options.
 *   @property {string} [cmd.name] - The name of the feature. If not provided, the function will prompt the user to enter the feature name.
 *   @property {number} [cmd.count] - The number of components to generate for the feature.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 *
 * @async
 *
 * @description
 * This function generates files for feature components based on the provided command options.
 * It first retrieves the feature name and component count from the command options.
 *
 * The command options allow customization of the generation process:
 *   - `name`: Specifies the name of the feature. If not provided, the function will prompt the user to enter the feature name.
 *   - `count`: Specifies the number of components to generate for the feature. If not provided,
 *              the function will prompt the user to enter the component count.
 *
 * The function creates an instance of the SyGen class as the generator and SyQue class as the queuer.
 * It then prompts for the feature name and validates it using the SyVal class.
 * The component count is also obtained from the command options or interactively prompted if not provided.
 *
 * The function constructs the feature directory path based on the validated feature name and the FEATURES_DIR constant.
 * It formats the feature name as a capitalized version using the SyAlter class.
 *
 * It ensures the existence of the feature directory using the generator's ensureAndLogDir method.
 * Then, it queues the files for feature components by calling the queuer's queueFeatureComponentFiles method,
 * passing the formatted feature name, feature directory, and component count.
 *
 * After queuing the files, it calls the generator's generateQueue method to generate the queued files.
 * The templates used during the generation process are returned and logged for statistics.
 *
 * If any error occurs during the generation process, it is handled and logged by the SyErr class.
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
