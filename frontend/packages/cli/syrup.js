#!/usr/bin/env node

import { program } from 'commander';

import { buildComponentFiles } from './src/commands/component.js';
import { buildFeatureFiles } from './src/commands/feature.js';
import { buildFeatureComponentFiles } from './src/commands/featureComponents.js';

import { promptSubdirectory } from './src/prompts/component.js';
import { promptComponentCount, promptFeatureType } from './src/prompts/feature.js';
import { promptFeatureName } from './src/prompts/featureComponent.js';
import { validateName } from './src/utils/validate.js';
import { CLIError } from './src/utils/errors.js';
import { Logger } from './src/utils/logger.js';

program.version('1.0.1').description('Syrup CLI');

program
  .command('gen-comp <componentName>')
  .alias('g')
  .description('Generate Non-Feature Component Files')
  .action(async (componentName) => {
    try {
      // Validate passed in name before continuing
      const validatedName = validateName(componentName);

      // Prompt for Subdirectory of src/components
      const subdirectory = await promptSubdirectory();

      // Build files based to subdirectory
      await buildComponentFiles(validatedName, subdirectory);
    } catch (error) {
      Logger.error(new CLIError(error));
    }
  });

program
  .command('gen-feat <featureName>')
  .alias('gf')
  .description('Generate Feature Files')
  .option('-t, --type <type>', 'Specify the type of feature (Individual or Suite)')
  .option('-c, --count <count>', 'Specify number of generated components', parseInt)
  .action(async (featureName, cmd) => {
    try {
      // Validate passed in name before continuing
      const validatedName = validateName(featureName);

      // Get passed options from CLI
      const { type, count } = cmd;

      // Prompt for type and count if options not passed
      const featureType = type || (await promptFeatureType());
      const componentCount = count || (await promptComponentCount());

      // Build files based on input
      buildFeatureFiles(validatedName, featureType, componentCount);
    } catch (error) {
      Logger.error(new CLIError(error));
    }
  });

program
  .command('gen-feat-comp')
  .alias('gfc')
  .description('Generate feature components')
  .option('-n, --name <name>', 'Specify the feature name')
  .option('-c, --count <count>', 'Specify number of generated components', parseInt)
  .action(async (cmd) => {
    try {
      // Get passed options from CLI
      const { name, count } = cmd;

      // Prompt if options not passed, validate name before continuing
      const featureName = name || (await promptFeatureName());
      const validatedName = validateName(featureName);
      const componentCount = count || (await promptComponentCount());

      // Build files based on input
      buildFeatureComponentFiles(validatedName, componentCount);
    } catch (error) {
      Logger.error(new CLIError(error));
    }
  });

program.parse(process.argv);
