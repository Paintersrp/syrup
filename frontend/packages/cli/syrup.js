#!/usr/bin/env node

import { program } from 'commander';
import { generateComponent } from './src/commands/generateComponent.js';
import { generateComponents } from './src/commands/generateComponents.js';
import { generateDirectories } from './src/commands/generateDirectories.js';
import { generateFeature } from './src/commands/generateFeature.js';
import { generateFeatureComponents } from './src/commands/generateFeatureComponents.js';
import { generateHook } from './src/commands/generateHook.js';
import { generateStore } from './src/commands/generateStore.js';
import { initializeProject } from './src/commands/initializeProject.js';

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
  .command('initialize')
  .alias('init')
  .description('Initialize the project structure')
  .action(async () => {
    await initializeProject();
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
    await generateComponent(componentName);
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

program.parse(process.argv);
