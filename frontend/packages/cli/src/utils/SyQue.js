import path from 'path';

import {
  FEATURES_DIR,
  FEATURE_COMPONENT_TYPE,
  FEATURE_SUBDIRS,
  INCLUDE_STORIES,
  INCLUDE_TESTS,
} from '../../config.js';
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
import { SyAlter } from './SyAlter.js';

/**
 * Utility class for queuing file templates for generation
 */
export class SyQue {
  /**
   * Creates an instance of SyQue.
   * @param {object} generator - The generator object used for generating files and folders.
   */
  constructor(generator) {
    this.generator = generator;
  }

  /**
   * Queues the files for a component, including the component file, storybook file, and test file.
   * @param {string} name - The name of the component.
   * @param {string} directory - The target directory for the component files.
   */
  async queueComponentFiles(name, directory) {
    this.generator.addFileToQueue(
      ComponentFullTemplate(name),
      path.join(directory, `${name}.tsx`),
      'Component File'
    );

    if (INCLUDE_STORIES) {
      this.generator.addFileToQueue(
        ComponentStorybookTemplate(name),
        path.join(directory, `${name}.stories.tsx`),
        'Storybook File'
      );
    }

    if (INCLUDE_TESTS) {
      this.generator.addFileToQueue(
        ComponentTestTemplate(name),
        path.join(directory, `${name}.test.tsx`),
        'Test File'
      );
    }
  }

  /**
   * Queues the files for an individual feature, including the page file, individual route index file, feature index file, and API index file.
   * @param {string} name - The name of the feature.
   * @param {string} directory - The target directory for the feature files.
   */
  async queueIndividualFeatureFiles(name, directory) {
    this.generator.addFileToQueue(
      FeaturePageTemplate(name),
      path.join(directory, 'routes', `${name}.tsx`),
      'Page File'
    );

    this.generator.addFileToQueue(
      FeatureRoutesIndividualTemplate(name),
      path.join(directory, 'routes', 'index.ts'),
      'Individual Route Index'
    );

    this.generator.addFileToQueue(
      IndexBasicTemplate(name),
      path.join(directory, 'index.ts'),
      'Feature Index'
    );

    this.generator.addFileToQueue(
      IndexHookIndividualTemplate(name),
      path.join(directory, 'api', 'index.ts'),
      'API Index'
    );
  }

  /**
   * Queues the files for a suite feature, including the page files, suite route index file, feature index file, API index file, and feature hook file.
   * @param {string} name - The name of the feature.
   * @param {string} singularName - The singular name of the feature.
   * @param {string} directory - The target directory for the feature files.
   */
  async queueSuiteFeatureFiles(name, singularName, directory) {
    [name, singularName].forEach((name) => {
      this.generator.addFileToQueue(
        FeaturePageTemplate(name),
        path.join(directory, 'routes', `${name}.tsx`),
        'Page File'
      );
    });

    this.generator.addFileToQueue(
      FeatureRoutesSuiteTemplate(name, singularName),
      path.join(directory, 'routes', 'index.tsx'),
      'Suite Route Index'
    );

    this.generator.addFileToQueue(
      IndexSuiteTemplate(name, singularName),
      path.join(directory, 'index.ts'),
      'Feature Index'
    );

    this.generator.addFileToQueue(
      IndexHookSuiteTemplate(name, singularName),
      path.join(directory, 'api', 'index.ts'),
      'API Index'
    );

    this.generator.addFileToQueue(
      FeatureHookTemplate(singularName),
      path.join(directory, 'api', `use${singularName}.ts`),
      'Feature Hook File'
    );
  }

  /**
   * Queues the files for a shared feature, including the component files, feature hook file, types index file, and component index file.
   * @param {string} name - The name of the feature.
   * @param {string} directory - The target directory for the feature files.
   * @param {number} componentCount - The number of component files to generate.
   */
  async queueSharedFeatureFiles(name, directory, componentCount) {
    const componentImports = [];

    for (let i = 1; i <= componentCount; i++) {
      const componentName = `${name}${i}`;
      componentImports.push(`export { ${componentName} } from './${componentName}';`);

      const fileTemplate =
        FEATURE_COMPONENT_TYPE === 'basic'
          ? ComponentBasicTemplate(componentName)
          : ComponentFullTemplate(componentName);

      const fileName = path.join(directory, 'components', `${componentName}.tsx`);

      await this.generator.addFileToQueue(fileTemplate, fileName, 'Component File');
    }

    this.generator.addFileToQueue(
      FeatureHookTemplate(name),
      path.join(directory, 'api', `use${name}.tsx`),
      'Feature Hook File'
    );

    this.generator.addFileToQueue(
      IndexTypesTemplate(name),
      path.join(directory, 'types', 'index.ts'),
      'Types Index'
    );

    this.generator.addFileToQueue(
      componentImports.join('\n'),
      path.join(directory, 'components', 'index.ts'),
      'Component Index'
    );
  }

  /**
   * Queue files for a feature based on the feature type.
   * @param {string} name - The name of the feature.
   * @param {string} type - The type of the feature ('Individual' or 'Suite').
   * @param {number} componentCount - The number of components for the feature.
   * @returns {Promise<void>}
   */
  async queueFeature(name, type, componentCount) {
    const featureDirectory = path.join(FEATURES_DIR, name);
    await this.generator.ensureAndLogDir(featureDirectory);

    const formattedName = SyAlter.capFirst(name);
    const singularName = SyAlter.deplural(formattedName);

    FEATURE_SUBDIRS.map(async (subdir) => {
      await this.generator.ensureAndLogDir(path.join(featureDirectory, subdir));
    });

    const queueFeatureByType =
      type === 'Individual'
        ? this.queueIndividualFeatureFiles(formattedName, featureDirectory)
        : this.queueSuiteFeatureFiles(formattedName, singularName, featureDirectory);

    await queueFeatureByType;
    await this.queueSharedFeatureFiles(formattedName, featureDirectory, componentCount);
  }

  /**
   * Queues the files for feature components, including the component files and component index file.
   * @param {string} name - The name of the feature.
   * @param {string} directory - The target directory for the feature files.
   * @param {number} componentCount - The number of component files to generate.
   */
  async queueFeatureComponentFiles(name, directory, componentCount) {
    const componentImports = [];

    await Promise.all(
      Array.from({ length: componentCount }, (_, i) => i + 1).map(async (i) => {
        const componentName = `${name}Gen${i}`;
        componentImports.push(`export { ${componentName} } from './${componentName}';`);

        const fileTemplate = ComponentBasicTemplate(componentName);
        const filePath = path.join(directory, 'components', `${componentName}.tsx`);

        await this.generator.addFileToQueue(fileTemplate, filePath, 'Component Basic File');
      })
    );

    const indexFilePath = path.join(directory, 'components', 'index.ts');
    const componentImportsContent = componentImports.join('\n');

    await this.generator.addFileToQueue(componentImportsContent, indexFilePath, 'Component Index');
  }

  /**
   * Queues a hook file.
   * @param {string} name - The name of the hook.
   * @param {string} directory - The target directory for the hook file.
   */
  async queueHookFile(name, directory) {
    const fileName = `${name}.tsx`;

    this.generator.addFileToQueue(
      AppHookTemplate(name),
      path.join(directory, fileName),
      'App Hook File'
    );
  }

  /**
   * Queues a store file.
   * @param {string} name - The name of the store.
   * @param {string} lowercaseName - The lowercase name of the store.
   * @param {string} directory - The target directory for the store file.
   */
  async queueStoreFile(name, lowercaseName, directory) {
    const fileName = `${lowercaseName}.tsx`;

    this.generator.addFileToQueue(
      AppStoreTemplate(name),
      path.join(directory, fileName),
      'App Store File'
    );
  }

  /**
   * Queues a generic file.
   * @param {string} name - The name of the file.
   * @param {string} extension - The extension of the file.
   * @param {string} template - The template content of the file.
   * @param {string} directory - The target directory for the file.
   * @param {string} verboseName - The verbose name of the file for logging.
   */
  async queueGenericFile(name, extension, template, directory, verboseName) {
    const fileName = `${name}.${extension}`;
    const finalDir = path.join(directory, fileName);

    this.generator.addFileToQueue(template, finalDir, verboseName);
  }

  /**
   * Queue multiple generic files with the same extension and template.
   * @param {string[]} names - An array of file names.
   * @param {string} extension - The file extension.
   * @param {string} template - The content template for the files.
   * @param {string} directory - The directory to queue the files in.
   * @param {string} verboseName - The verbose name for the files.
   * @returns {Promise<void>}
   */
  async queueManyGenericFiles(names, extension, template, directory, verboseName) {
    await Promise.all(
      names.map(async (name) => {
        this.queueGenericFile(name, extension, template, directory, verboseName);
      })
    );
  }
}
