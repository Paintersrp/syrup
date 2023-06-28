#!/usr/bin/env node

import { program } from 'commander';

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

/**
 * Syrup CLI
 */
program.version('1.0.1').description('Syrup CLI');

/**
 * Generate App Component Files Command
 */
program
  .command('gen-comp <componentName>')
  .alias('gen-c')
  .alias('gc')
  .description('Generate App Component Files')
  .action(async (componentName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.validateName(componentName);
      const subdirectory = await promptSubdirectory();

      await buildComponentFiles(validatedName, subdirectory);
    });
  });

/**
 * Generate Feature Files Command
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
      const validatedName = SyValidator.validateName(featureName);
      const { type, count } = cmd;
      const featureType = type || (await promptFeatureType());
      const componentCount = count || (await promptComponentCount());

      buildFeatureFiles(validatedName, featureType, componentCount);
    });
  });

/**
 * Generate Feature Components Command
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
      const validatedName = SyValidator.validateName(featureName);
      const componentCount = count || (await promptComponentCount());

      buildFeatureComponentFiles(validatedName, componentCount);
    });
  });

/**
 * Generate Hook File Command
 */
program
  .command('gen-hook <hookName>')
  .alias('gh')
  .alias('gen-h')
  .description('Generate Store File')
  .action(async (hookName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.validateName(hookName);
      buildHookFile(validatedName);
    });
  });

/**
 * Generate Store File command
 */
program
  .command('gen-store <storeName>')
  .alias('gs')
  .alias('gen-s')
  .description('Generate Store File')
  .action(async (storeName) => {
    await SyError.handleCommand(async () => {
      const validatedName = SyValidator.validateName(storeName);

      buildStoreFile(validatedName);
    });
  });

program.parse(process.argv);
