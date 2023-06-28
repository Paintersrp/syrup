#!/usr/bin/env node

import { program } from 'commander';

import { buildComponentFiles } from './src/commands/component.js';
import { buildFeatureFiles } from './src/commands/feature.js';
import { buildFeatureComponentFiles } from './src/commands/featureComponents.js';
import { buildHookFile } from './src/commands/hook.js';
import { buildStoreFile } from './src/commands/store.js';

import { promptSubdirectory } from './src/prompts/component.js';
import { promptComponentCount, promptFeatureType } from './src/prompts/feature.js';
import { promptFeatureName } from './src/prompts/featureComponent.js';

import { handleCommandError } from './src/utils/errors.js';
import { validateName } from './src/utils/validate.js';

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
    await handleCommandError(async () => {
      /**
       * Validate passed in name before continuing
       */
      const validatedName = validateName(componentName);

      /**
       * Prompt for Subdirectory of src/components
       */
      const subdirectory = await promptSubdirectory();

      /**
       * Build files based to subdirectory.
       */
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
    await handleCommandError(async () => {
      /**
       * Validate passed in name before continuing
       */
      const validatedName = validateName(featureName);

      /**
       * Get passed options from CLI
       */
      const { type, count } = cmd;

      /**
       * Prompt for type and count if options were not passed.
       */
      const featureType = type || (await promptFeatureType());
      const componentCount = count || (await promptComponentCount());

      /**
       * Build files based on input.
       */
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
    await handleCommandError(async () => {
      /**
       * Get passed options from CLI.
       */
      const { name, count } = cmd;

      /**
       * Prompt if options not passed, validate name before continuing
       */
      const featureName = name || (await promptFeatureName());
      const validatedName = validateName(featureName);
      const componentCount = count || (await promptComponentCount());

      /**
       * Build files based on input
       */
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
    await handleCommandError(async () => {
      /**
       * Validate passed in name before continuing
       */
      const validatedName = validateName(hookName);

      /**
       * Build files based on input
       */
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
    await handleCommandError(async () => {
      /**
       * Validate passed in name before continuing
       */
      const validatedName = validateName(storeName);

      /**
       * Build files based on input
       */
      buildStoreFile(validatedName);
    });
  });

program.parse(process.argv);
