#!/usr/bin/env node

import { program } from 'commander';

import {
  generateComponents,
  generateDirectories,
  generateEndpoint,
  generateFeature,
  generateFeatureComponents,
  generateHook,
  generateModelSchema,
  generateProject,
  generateStore,
  generateKoaModel,
} from './src/commands/index.js';

/**
 * Syrup CLI
 *
 * Initializes the Syrup Command Line Interface.
 * Provides commands for generating directories and files.
 */
program.version('1.0.2').description('Syrup CLI');

/**
 * Initialize Project Command.
 *
 * This command initializes the project structure by creating the necessary directories and files.
 * It sets up the basic folder structure and configuration files required for the project.
 */
program
  .command('gen-project')
  .alias('gen-p')
  .alias('gp')
  .alias('init')
  .description('Initialize the project structure')
  .action(async () => {
    await generateProject();
  });

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
    await generateDirectories(directoryNames);
  });

/**
 * Generate One or Many Components Command
 *
 * Command to generate one or many components in the Components Directory.
 * This command accepts a list of component names and creates directories and files for each component.
 */
program
  .command('gen-comp <componentNames...>')
  .alias('gen-c')
  .alias('gc')
  .description('Generate One or Many App Components')
  .action(async (componentNames) => {
    await generateComponents(componentNames);
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
    generateFeature(featureName, cmd);
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
    generateFeatureComponents(cmd);
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
    generateHook(hookName);
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
    generateStore(storeName);
  });

program
  .command('gen-model')
  .alias('gen-m')
  .alias('gm')
  .description('Generate Model Schema')
  .option('-f, --fields', 'Specify fields for the model')
  .action((options) => {
    generateModelSchema(options);
  });

program
  .command('gen-endpoint <appName>')
  .alias('gen-e')
  .alias('ge')
  .description('Create a new api endpoint')
  .action((appName) => {
    generateEndpoint(appName);
  });

// Koa Start
program
  .command('gen-koa-model')
  .alias('gen-k-m')
  .alias('gkm')
  .description('Generate Koa Model')
  .option('-f, --fields', 'Specify fields for the model')
  .action((options) => {
    generateKoaModel(options);
  });
// Koa End

program.parse(process.argv);
