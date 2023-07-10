import path from 'path';

import { promptModelAppDirectory } from '../prompts/promptModelAppDirectory.js';
import { promptModelFields } from '../prompts/promptModelFields.js';
import { promptModelName } from '../prompts/promptModelName.js';

import { queueModel } from '../queue/queueModel.js';

import { handleFunction } from '../utils/error.js';
import { getPaths, SyGen, SyLog } from '../utils/index.js';

/**
 * @description
 * Generate a model schema based on the provided options, including the model name and fields.
 *
 * @param {object} options - The options for generating the model schema.
 *   @property {boolean} [options.fields] - Flag indicating if the model has fields.
 * @throws {Error} If an error occurs during the generation process.
 * @returns {Promise<void>}
 * @async
 */
export async function generateModelSchema(options) {
  await handleFunction(async () => {
    const generator = new SyGen();
    const paths = getPaths();

    const modelName = await promptModelName();
    const hasFields = options.fields;

    let fields = [];
    if (hasFields) {
      fields = await promptModelFields(modelName);
    }

    const appDir = await promptModelAppDirectory(paths.api);
    const modelDir = path.join(paths.api, appDir);

    await queueModel(generator, modelDir, modelName, fields);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
