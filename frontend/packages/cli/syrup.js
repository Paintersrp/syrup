#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';

import { buildComponentFiles } from './src/builders/buildComponentFiles.js';
import { buildFeatureFiles } from './src/builders/buildFeatureFiles.js';
import { buildFeatureComponentFiles } from './src/builders/buildFeatureComponentFiles.js';
import { buildHookFile } from './src/builders/buildHookFile.js';
import { buildStoreFile } from './src/builders/buildStoreFile.js';

import { promptSubdirectory } from './src/prompts/promptSubdirectory.js';
import { promptComponentCount } from './src/prompts/promptComponentCount.js';
import { promptFeatureName } from './src/prompts/promptFeatureName.js';
import { promptFeatureType } from './src/prompts/promptFeatureType.js';

import { SyError } from './src/utils/SyError.js';
import { SyValidator } from './src/utils/SyValidator.js';
import { COMPONENTS_DIR } from './config.js';
import { SyLogger } from './src/utils/SyLogger.js';

/**
 * Syrup CLI
 *
 * Initializes the Syrup Command Line Interface.
 * Provides commands for generating directories and files.
 */
program.version('1.0.2').description('Syrup CLI');

/**
 * Generate Directories Command
 *
 * Command to generate directories in the Components Directory.
 * This command accepts a list of directory names and creates directories for each valid name.
 */
program
  .command('gen-dirs <directoryNames...>')
  .alias('gen-d')
  .alias('gd')
  .description('Generate directories in Components Directory')
  .action(async (directoryNames) => {
    await SyError.handleCommand(async () => {
      const validNames = directoryNames.filter(SyValidator.directory);

      validNames.forEach((name) => {
        const dirPath = path.join(COMPONENTS_DIR, name);
        SyLogger.ensureAndLogDir(dirPath);
      });
    });
  });

/**
 * Generate Component Command
 *
 * Command to generate a single component in the Components Directory.
 * This command accepts a component name and a create directory and relevant files.
 */
program
  .command('gen-comp <componentName>')
  .alias('gen-c')
  .alias('gc')
  .description('Generate App Component Files')
  .action(async (componentName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.name(componentName);
      const subdirectory = await promptSubdirectory();

      await buildComponentFiles(validatedName, subdirectory);
    });
  });

/**
 * Generate Multiple Components Command
 *
 * Command to generate multiple components in the Components Directory.
 * This command accepts a list of component names and creates directories and files for each component.
 */
program
  .command('gen-comps <componentNames...>')
  .alias('gen-cs')
  .alias('gcs')
  .description('Generate Multiple App Components')
  .action(async (componentNames) => {
    await SyError.handleCommand(async () => {
      for (const name of componentNames) {
        const subdirectory = await promptSubdirectory(name);
        await buildComponentFiles(name, subdirectory);
      }
    });
  });

/**
 * Generate Feature Files Command
 *
 * Command to generate files for a feature in the Components Directory.
 * This command accepts a feature name, type, and component count, and generates files accordingly.
 */
program
  .command('gen-feat <featureName>')
  .alias('gen-f')
  .alias('gf')
  .description('Generate Feature Files')
  .option('-t, --type <type>', 'Specify the type of feature (Individual or Suite)')
  .option('-c, --count <count>', 'Specify number of generated components', parseInt)
  .action(async (featureName, cmd) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.name(featureName);
      const { type, count } = cmd;
      const featureType = type || (await promptFeatureType());
      const componentCount = count || (await promptComponentCount());

      buildFeatureFiles(validatedName, featureType, componentCount);
    });
  });

/**
 * Generate Feature Components Command
 *
 * Command to generate components for a feature in the Components Directory.
 * This command accepts a feature name and component count, and generates components accordingly.
 */
program
  .command('gen-feat-comp')
  .alias('gen-f-c')
  .alias('gfc')
  .description('Generate feature components')
  .option('-n, --name <name>', 'Specify the feature name')
  .option('-c, --count <count>', 'Specify number of generated components', parseInt)
  .action(async (cmd) => {
    await SyError.handleCommand(async () => {
      const { name, count } = cmd;
      const featureName = name || (await promptFeatureName());
      const validatedName = SyValidator.name(featureName);
      const componentCount = count || (await promptComponentCount());

      buildFeatureComponentFiles(validatedName, componentCount);
    });
  });

/**
 * Generate Hook File Command
 *
 * This command accepts a hook name and generates the corresponding file.
 */
program
  .command('gen-hook <hookName>')
  .alias('gh')
  .alias('gen-h')
  .description('Generate hook File')
  .action(async (hookName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.name(hookName);
      buildHookFile(validatedName);
    });
  });

/**
 * Generate Store File Command
 *
 * This command accepts a store name and generates the corresponding file.
 */
program
  .command('gen-store <storeName>')
  .alias('gs')
  .alias('gen-s')
  .description('Generate Store File')
  .action(async (storeName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.name(storeName);

      buildStoreFile(validatedName);
    });
  });

program.parse(process.argv);
