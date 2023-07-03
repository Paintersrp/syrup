import path from 'path';
import { ComponentBasicTemplate } from '../templates/index.js';

/**
 * @description
 * Queues the files for feature components, including the component files and component index file.
 *
 * @param {string} name - The name of the feature.
 * @param {string} directory - The target directory for the feature files.
 * @param {number} componentCount - The number of component files to generate.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueFeatureComponents(name, directory, componentCount, generator) {
  const componentImports = [];

  await Promise.all(
    Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
      const componentName = `${name}Gen${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      const fileTemplate = ComponentBasicTemplate(componentName);
      const filePath = path.join(directory, 'components', `${componentName}.tsx`);

      await generator.addFileToQueue(fileTemplate, filePath, 'Component Basic File');
    })
  );

  const indexFilePath = path.join(directory, 'components', 'index.ts');
  const componentImportsContent = componentImports.join('\n');

  await generator.addFileToQueue(componentImportsContent, indexFilePath, 'Component Index');
}
