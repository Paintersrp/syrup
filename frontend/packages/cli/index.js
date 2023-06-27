#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

import { genIndividualFiles, genSharedFiles, genSuiteFiles } from './src/lib/index.js';
import {
  capFirst,
  deplural,
  generateFile,
  componentSubdirectories,
  featureSubdirectories,
} from './src/utils/index.js';

import {
  ComponentFullTemplate,
  ComponentStoriesTemplate,
  ComponentTestTemplate,
} from './src/template/component.js';

const __dirname = path.resolve();

program.version('1.0.0').description('Syrup CLI');

program
  .command('generate <componentName>')
  .alias('g')
  .description('Generate component files')
  .action(async (componentName) => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'subdirectory',
        message: 'Choose a subdirectory for the component:',
        choices: componentSubdirectories,
      },
    ]);

    const generatedFiles = [];
    const formattedName = capFirst(componentName);

    const componentDirectory = path.join(
      __dirname,
      'src',
      'components',
      answers.subdirectory,
      formattedName
    );

    await fs.ensureDir(componentDirectory);
    console.log(chalk.green(`Component folder created: ${componentDirectory}`));

    try {
      await generateFile(
        path.join(componentDirectory, `${formattedName}.tsx`),
        ComponentFullTemplate(formattedName),
        generatedFiles
      );
      console.log(chalk.green(`Component file generated: ${formattedName}.tsx`));
    } catch (error) {
      console.error(chalk.red(`Failed to generate component file: ${formattedName}.tsx`));
      console.error(chalk.red(error));
    }

    try {
      await generateFile(
        path.join(componentDirectory, `${formattedName}.stories.tsx`),
        ComponentStoriesTemplate(formattedName),
        generatedFiles
      );
      console.log(chalk.green(`Stories file generated: ${formattedName}.stories.tsx`));
    } catch (error) {
      console.error(chalk.red(`Failed to generate stories file: ${formattedName}.stories.tsx`));
      console.error(chalk.red(error));
    }

    try {
      await generateFile(
        path.join(componentDirectory, `${formattedName}.test.tsx`),
        ComponentTestTemplate(formattedName),
        generatedFiles
      );
      console.log(chalk.green(`Test file generated: ${formattedName}.test.tsx`));
    } catch (error) {
      console.error(chalk.red(`Failed to generate test file: ${formattedName}.test.tsx`));
      console.error(chalk.red(error));
    }

    console.log(chalk.green('Component files generation completed!'));
    console.log(chalk.yellow(`\nGenerated Files:\n${generatedFiles.join('\n')}`));
  });

program
  .command('generate-feature <featureName>')
  .alias('gf')
  .description('Generate feature files')
  .action(async (featureName) => {
    const featureDirectory = path.join(__dirname, 'src', 'features', featureName);
    const formattedName = capFirst(featureName);
    const depluraledName = deplural(formattedName);

    await fs.ensureDir(featureDirectory);

    const { featureType, componentCount } = await inquirer.prompt([
      {
        type: 'list',
        name: 'featureType',
        message: 'What type of feature do you want?',
        choices: ['Individual', 'Suite'],
        default: 'Individual',
      },
      {
        type: 'number',
        name: 'componentCount',
        message: 'How many pre-generated components do you want?',
        default: 1,
      },
    ]);

    const generatedFiles = [];

    await Promise.all(
      featureSubdirectories.map(async (subdir) => {
        await fs.ensureDir(path.join(featureDirectory, subdir));
        if (subdir !== 'routes') {
          await generateFile(path.join(featureDirectory, subdir, 'index.ts'), '', generatedFiles);
        }
      })
    );

    if (featureType === 'Individual') {
      await genIndividualFiles(featureDirectory, formattedName, generatedFiles);
    }

    if (featureType === 'Suite') {
      await genSuiteFiles(featureDirectory, formattedName, depluraledName, generatedFiles);
    }

    const componentImports = [];

    await genSharedFiles(
      featureDirectory,
      formattedName,
      generatedFiles,
      componentCount,
      componentImports
    );

    if (generatedFiles.length > 0) {
      console.log(chalk.yellow('\nGenerated files:'));
      for (const file of generatedFiles) {
        console.log(chalk.green(' ✔ '), file);
      }
    }
  });

program.parse(process.argv);
