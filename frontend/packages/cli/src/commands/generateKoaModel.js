import { promptKoaModelName, promptKoaModelFields } from '../prompts/index.js';
import { queueKoaModel } from '../queue/queueKoaModel.js';

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
export async function generateKoaModel(options) {
  await handleFunction(async () => {
    const generator = new SyGen();
    const paths = getPaths();

    const modelName = await promptKoaModelName();
    const hasFields = options.fields;

    let fields = [];
    if (hasFields) {
      fields = await promptKoaModelFields(modelName);
    }

    await generator.ensureAndLogDir(paths.api.models);
    await generator.ensureAndLogDir(paths.api.schemas);
    await generator.ensureAndLogDir(paths.api.views);

    await queueKoaModel(generator, paths, modelName, fields);

    const templatesUsed = await generator.generateQueue();
    SyLog.logStats(templatesUsed);
  });
}
