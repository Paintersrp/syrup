import fs from 'fs-extra';
import path from 'path';

import { FEATURE_COMPONENT_TYPE } from '../../config.js';
import {
  ComponentBasicTemplate,
  ComponentFullTemplate,
  FeatureHookTemplate,
  FeaturePageTemplate,
  FeatureRoutesIndividualTemplate,
  FeatureRoutesSuiteTemplate,
  IndexBasicTemplate,
  IndexHookIndividualTemplate,
  IndexHookSuiteTemplate,
  IndexSuiteTemplate,
  IndexTypesTemplate,
} from '../templates/index.js';
import { capFirst, deplural } from '../utils/format.js';
import { FEATURE_SUBDIRS, getPaths } from '../utils/getPaths.js';

/**
 * @description
 * Queues the files for an individual feature, including the page file, individual route index file, feature index file, and API index file.
 *
 * @param {string} name - The name of the feature.
 * @param {string} directory - The target directory for the feature files.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueIndividualFeature(name, directory, generator) {
  generator.addFileToQueue(
    FeaturePageTemplate(name),
    path.join(directory, 'routes', `${name}.tsx`),
    'Page File'
  );

  generator.addFileToQueue(
    FeatureRoutesIndividualTemplate(name),
    path.join(directory, 'routes', 'index.ts'),
    'Individual Route Index'
  );

  generator.addFileToQueue(
    IndexBasicTemplate(name),
    path.join(directory, 'index.ts'),
    'Feature Index'
  );

  generator.addFileToQueue(
    IndexHookIndividualTemplate(name),
    path.join(directory, 'api', 'index.ts'),
    'API Index'
  );
}

/**
 * @description
 * Queues the files for a suite feature, including the page files, suite route index file, feature index file, API index file, and feature hook file.
 *
 * @param {string} name - The name of the feature.
 * @param {string} singularName - The singular name of the feature.
 * @param {string} directory - The target directory for the feature files.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueSuiteFeature(name, singularName, directory, generator) {
  [name, singularName].forEach((name) => {
    generator.addFileToQueue(
      FeaturePageTemplate(name),
      path.join(directory, 'routes', `${name}.tsx`),
      'Page File'
    );
  });

  generator.addFileToQueue(
    FeatureRoutesSuiteTemplate(name, singularName),
    path.join(directory, 'routes', 'index.tsx'),
    'Suite Route Index'
  );

  generator.addFileToQueue(
    IndexSuiteTemplate(name, singularName),
    path.join(directory, 'index.ts'),
    'Feature Index'
  );

  generator.addFileToQueue(
    IndexHookSuiteTemplate(name, singularName),
    path.join(directory, 'api', 'index.ts'),
    'API Index'
  );

  generator.addFileToQueue(
    FeatureHookTemplate(singularName),
    path.join(directory, 'api', `use${singularName}.ts`),
    'Feature Hook File'
  );
}

/**
 * @description
 * Queues the files for a shared feature, including the component files, feature hook file, types index file, and component index file.
 *
 * @param {string} name - The name of the feature.
 * @param {string} directory - The target directory for the feature files.
 * @param {number} componentCount - The number of component files to generate.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueSharedFeature(name, directory, componentCount, generator) {
  const componentImports = [];

  for (let i = 1; i <= componentCount; i++) {
    const componentName = `${name}${i}`;
    componentImports.push(`export { ${componentName} } from './${componentName}';`);

    const fileTemplate =
      FEATURE_COMPONENT_TYPE === 'basic'
        ? ComponentBasicTemplate(componentName)
        : ComponentFullTemplate(componentName);

    const fileName = path.join(directory, 'components', `${componentName}.tsx`);

    await generator.addFileToQueue(fileTemplate, fileName, 'Component File');
  }

  generator.addFileToQueue(
    FeatureHookTemplate(name),
    path.join(directory, 'api', `use${name}.tsx`),
    'Feature Hook File'
  );

  generator.addFileToQueue(
    IndexTypesTemplate(name),
    path.join(directory, 'types', 'index.ts'),
    'Types Index'
  );

  generator.addFileToQueue(
    componentImports.join('\n'),
    path.join(directory, 'components', 'index.ts'),
    'Component Index'
  );
}

/**
 * @description
 * Queue the update of routes file to include the new feature.
 *
 * @param {string} name - The name of the feature.
 * @param {string} path - The path to the routes file.
 * @param {string} type - The type of the feature ('Individual' or 'Suite').
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueRoutesUpdate(name, path, type, generator) {
  const currentContent = fs.readFileSync(path, 'utf8');
  const lowercaseName = name.toLowerCase();

  const importName = type === 'Suite' ? `${name}Routes` : name;
  const routePath = type === 'Suite' ? `/${lowercaseName}/*` : `/${lowercaseName}`;

  const featureImport = `const { ${importName} } = lazyImport(() => import('@/features/${lowercaseName}'), '${importName}')`;
  const newRoute = `{ path: '${routePath}', element: <${importName} /> },`;

  // Find the position to insert the feature import and route
  const importIndex = currentContent.indexOf('const { Home } =');
  const routeIndex = currentContent.indexOf("{ path: '*'");

  const updatedRoutesContent =
    currentContent.slice(0, importIndex) +
    `${featureImport}\n` +
    currentContent.slice(importIndex, routeIndex) +
    `${newRoute}\n` +
    currentContent.slice(routeIndex);

  generator.addFileToQueue(updatedRoutesContent, path, 'App Routes');
}

/**
 * @description
 * Queue files for a feature based on the feature type.
 *
 * @param {string} name - The name of the feature.
 * @param {string} type - The type of the feature ('Individual' or 'Suite').
 * @param {number} componentCount - The number of components for the feature.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 */
export async function queueFeature(name, type, componentCount, generator) {
  const paths = getPaths();
  const featureDirectory = path.join(paths.web.src.features, name);
  await generator.ensureAndLogDir(featureDirectory);

  const routesDirectory = path.join(paths.web.src.routes, 'protected.tsx');
  await generator.ensureAndLogDir(routesDirectory);

  const formattedName = capFirst(name);
  const singularName = deplural(formattedName);

  FEATURE_SUBDIRS.map(async (subdir) => {
    await generator.ensureAndLogDir(path.join(featureDirectory, subdir));
  });

  const queueFeatureByType =
    type === 'Individual'
      ? queueIndividualFeature(formattedName, featureDirectory, generator)
      : queueSuiteFeature(formattedName, singularName, featureDirectory, generator);

  await queueFeatureByType;
  await queueSharedFeature(formattedName, featureDirectory, componentCount, generator);
  await queueRoutesUpdate(formattedName, routesDirectory, type, generator);
}
