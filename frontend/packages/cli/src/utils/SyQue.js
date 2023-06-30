import path from 'path';

import { FEATURE_COMPONENT_TYPE, INCLUDE_STORIES, INCLUDE_TESTS } from '../../config.js';
import { AppHookTemplate } from '../templates/appHook.js';
import { AppStoreTemplate } from '../templates/appStore.js';

import { ComponentBasicTemplate } from '../templates/componentBasic.js';
import { ComponentFullTemplate } from '../templates/componentFull.js';
import { ComponentStorybookTemplate } from '../templates/componentStorybook.js';
import { ComponentTestTemplate } from '../templates/componentTest.js';

import { FeatureHookTemplate } from '../templates/featureHook.js';
import { FeaturePageTemplate } from '../templates/featurePage.js';
import { FeatureRoutesIndividualTemplate } from '../templates/featureRoutesIndividual.js';
import { FeatureRoutesSuiteTemplate } from '../templates/featureRoutesSuite.js';

import { IndexBasicTemplate } from '../templates/indexBasic.js';
import { IndexHookIndividualTemplate } from '../templates/indexHook.js';
import { IndexHookSuiteTemplate } from '../templates/indexHookSuite.js';
import { IndexSuiteTemplate } from '../templates/indexSuite.js';
import { IndexTypesTemplate } from '../templates/indexTypes.js';

/**
 * Utility class for queuing files for a generator, which is for generating files and folders,
 * using SyLogger for messages and feedback as well as SyError for errors.
 */
export class SyQue {
  constructor(generator) {
    this.generator = generator;
  }

  async queueComponentFiles(name, directory) {
    this.generator.addFileTemplate(
      ComponentFullTemplate(name),
      path.join(directory, `${name}.tsx`),
      'Component File'
    );

    if (INCLUDE_STORIES) {
      this.generator.addFileTemplate(
        ComponentStorybookTemplate(name),
        path.join(directory, `${name}.stories.tsx`),
        'Storybook File'
      );
    }

    if (INCLUDE_TESTS) {
      this.generator.addFileTemplate(
        ComponentTestTemplate(name),
        path.join(directory, `${name}.test.tsx`),
        'Test File'
      );
    }
  }

  async queueIndividualFeatureFiles(name, directory) {
    this.generator.addFileTemplate(
      FeaturePageTemplate(name),
      path.join(directory, 'routes', `${name}.tsx`),
      'Page File'
    );

    this.generator.addFileTemplate(
      FeatureRoutesIndividualTemplate(name),
      path.join(directory, 'routes', 'index.ts'),
      'Individual Route Index'
    );

    this.generator.addFileTemplate(
      IndexBasicTemplate(name),
      path.join(directory, 'index.ts'),
      'Feature Index'
    );

    this.generator.addFileTemplate(
      IndexHookIndividualTemplate(name),
      path.join(directory, 'api', 'index.ts'),
      'API Index'
    );
  }

  async queueSuiteFeatureFiles(name, singularName, directory) {
    [name, singularName].forEach((name) => {
      this.generator.addFileTemplate(
        FeaturePageTemplate(name),
        path.join(directory, 'routes', `${name}.tsx`),
        'Page File'
      );
    });

    this.generator.addFileTemplate(
      FeatureRoutesSuiteTemplate(name),
      path.join(directory, 'routes', 'index.tsx'),
      'Suite Route Index'
    );

    this.generator.addFileTemplate(
      IndexSuiteTemplate(name),
      path.join(directory, 'index.ts'),
      'Feature Index'
    );

    this.generator.addFileTemplate(
      IndexHookSuiteTemplate(name),
      path.join(directory, 'api', 'index.ts'),
      'API Index'
    );

    this.generator.addFileTemplate(
      FeatureHookTemplate(singularName),
      path.join(directory, 'api', `use${singularName}.ts`),
      'Feature Hook File'
    );
  }

  async queueSharedFeatureFiles(name, directory, componentCount) {
    const componentImports = [];

    for (let i = 1; i <= componentCount; i++) {
      const componentName = `${name}${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      let fileTemplate;
      if (FEATURE_COMPONENT_TYPE === 'basic') {
        fileTemplate = ComponentBasicTemplate(componentName);
      } else {
        fileTemplate = ComponentFullTemplate(componentName);
      }

      const fileName = path.join(directory, 'components', `${componentName}.tsx`);

      await this.generator.addFileTemplate(fileTemplate, fileName, 'Component File');
    }

    this.generator.addFileTemplate(
      FeatureHookTemplate(name),
      path.join(directory, 'api', `use${name}.tsx`),
      'Feature Hook File'
    );

    this.generator.addFileTemplate(
      IndexTypesTemplate(name),
      path.join(directory, 'types', 'index.ts'),
      'Types Index'
    );

    this.generator.addFileTemplate(
      componentImports.join('\n'),
      path.join(directory, 'components', 'index.ts'),
      'Component Index'
    );

    this.generator.addFileTemplate('', path.join(directory, 'types', 'index.ts'), 'Types Index');
  }

  async queueFeatureComponentFiles(name, directory, componentCount) {
    const componentImports = [];

    await Promise.all(
      Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
        const componentName = `${name}Gen${i}`;
        componentImports.push(`export { ${componentName} } from './${componentName}';`);

        const fileTemplate = ComponentBasicTemplate(componentName);
        const filePath = path.join(directory, 'components', `${componentName}.tsx`);

        await this.generator.addFileTemplate(fileTemplate, filePath, 'Component Basic File');
      })
    );

    const indexFilePath = path.join(directory, 'components', 'index.ts');
    const componentImportsContent = componentImports.join('\n');

    await this.generator.addFileTemplate(componentImportsContent, indexFilePath, 'Component Index');
  }

  async queueHookFile(name, directory) {
    const fileName = `${name}.tsx`;

    this.generator.addFileTemplate(
      AppHookTemplate(name),
      path.join(directory, fileName),
      'App Hook File'
    );
  }

  async queueStoreFile(name, lowercaseName, directory) {
    const fileName = `${lowercaseName}.tsx`;

    this.generator.addFileTemplate(
      AppStoreTemplate(name),
      path.join(directory, fileName),
      'App Store File'
    );
  }

  async queueGenericFile(name, extension, template, directory, verboseName) {
    const fileName = `${name}.${extension}`;
    const finalDir = path.join(directory, fileName);

    this.generator.addFileTemplate(template, finalDir, verboseName);
  }
}
