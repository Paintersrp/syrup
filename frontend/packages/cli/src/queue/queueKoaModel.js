import path from 'path';
import fs from 'fs-extra';

import { KoaModelTemplate, KoaSchemaTemplate, KoaViewsTemplate } from '../templates/koa/index.js';
import { capFirst } from '../utils/format.js';
import { queueIndexUpdate } from './queueIndexUpdate.js';

/**
 * @description
 * Queue the generation of files for an app, including model, views, and types.
 *
 * @param {SyGen} generator - The generator instance.
 * @param {string} paths - Object of project structure paths.
 * @param {string} modelName - The name of the model.
 * @param {Array<Object>} fields - The fields of the model.
 * @returns {Promise<void>}
 * @async
 */
export async function queueKoaModel(generator, paths, modelName, fields) {
  const formattedModelName = capFirst(modelName);
  const fileName = `${modelName}.ts`;

  await queueKoaModelFile(modelName, formattedModelName, paths, fields, fileName, generator);
  await queueKoaSchemaFile(modelName, formattedModelName, paths, fields, fileName, generator);
  await queueKoaViewsFile(modelName, formattedModelName, paths, fileName, generator);
  await queueKoaSettingsUpdate(formattedModelName, paths, generator);
}

export async function queueKoaModelFile(name, formattedName, paths, fields, fileName, generator) {
  const modelTemplate = KoaModelTemplate(formattedName, fields);
  const modelFilePath = path.join(paths.api.models, fileName);
  await generator.addFileToQueue(modelTemplate, modelFilePath, 'Koa Model File');

  const modelExportStatement = `export { ${formattedName} } from './${name}';\n`;
  await queueIndexUpdate(modelExportStatement, paths.api.models, 'Model Index File', generator);
}

export async function queueKoaSchemaFile(name, formattedName, paths, fields, fileName, generator) {
  const schemaTemplate = KoaSchemaTemplate(formattedName, fields);
  const schemaFilePath = path.join(paths.api.schemas, fileName);
  await generator.addFileToQueue(schemaTemplate, schemaFilePath, 'Koa Schema File');

  const schemaExportStatement = `export { ${formattedName}Schema } from './${name}';\n`;
  await queueIndexUpdate(schemaExportStatement, paths.api.schemas, 'Schemas Index File', generator);
}

export async function queueKoaViewsFile(name, formattedName, paths, fileName, generator) {
  const viewsTemplate = KoaViewsTemplate(formattedName, name);
  const viewsFilePath = path.join(paths.api.views, fileName);
  await generator.addFileToQueue(viewsTemplate, viewsFilePath, 'Koa Views File');

  const viewsExportStatement = `export { ${formattedName}Views } from './${name}';\n`;
  await queueIndexUpdate(viewsExportStatement, paths.api.views, 'Views Index File', generator);
}

export async function queueKoaSettingsUpdate(formattedName, paths, generator) {
  const settingsPath = `${paths.api.abs}/settings.ts`;
  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  const appPattern = `\\b${formattedName}Views\\b`;

  // Regex to find APP_VIEWS in settings.ts
  const installedAppsPattern = /APP_VIEWS\s*=\s*\[(?:[^\]]+\[[^\]]+\]|[^\]]+)]/s;
  const installedAppsMatch = settingsContent.match(installedAppsPattern);

  // May need to determine if one line or not, by looking at the end.. [,] vs []
  if (installedAppsMatch) {
    const installedAppsList = installedAppsMatch[0];

    if (!installedAppsList.includes(appPattern)) {
      const updatedInstalledAppsList = installedAppsList.replace(
        /(\[|\])\s*$/, // Remove trailing comma and whitespace
        `,\nviews.${formattedName}Views,\n$1`
      );

      const updatedSettingsContent = settingsContent.replace(
        installedAppsPattern,
        updatedInstalledAppsList
      );

      await generator.addFileToQueue(updatedSettingsContent, settingsPath, 'Updated Settings File');
    } else {
      console.log(`App '${formattedName}Views' is already included in APP_VIEWS.`);
    }
  } else {
    throw new Error('APP_VIEWS not found in settings.ts');
  }
}
