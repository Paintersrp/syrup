#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const __dirname = path.resolve();

program.version('1.0.0').description('Syrup CLI');

program
  .command('generate <componentName>')
  .alias('g')
  .description('Generate component files')
  .action(async (componentName) => {
    const componentDirectory = path.join(__dirname, 'src', 'components', componentName);

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'createFolder',
        message: 'Create a folder for the component?',
        default: true,
      },
    ]);

    if (answers.createFolder) {
      await fs.ensureDir(componentDirectory);
    }

    await fs.writeFile(
      path.join(componentDirectory, `${componentName}.tsx`),
      `
       import React from 'react';

       const ${componentName} = () => {
          return (
            <div>
              <h1>${componentName}</h1>
            </div>
          );
        };

        export default ${componentName};
      `
    );

    console.log(chalk.green('Component files generated successfully!'));

    // Generate stories file
    await fs.writeFile(
      path.join(componentDirectory, `${componentName}.stories.tsx`),
      `
       import React from 'react';
       import ${componentName} from './${componentName}';

       export default {
         title: 'Components/${componentName}',
         component: ${componentName},
       };

       export const Default = () => <${componentName} />;
      `
    );

    console.log(chalk.green('Stories file generated successfully!'));
  });

program
  .command('generate-feature <featureName>')
  .alias('gf')
  .description('Generate feature files')
  .action(async (featureName) => {
    const featureDirectory = path.join(__dirname, 'src', 'features', featureName);

    await fs.ensureDir(featureDirectory);

    const subdirectories = ['api', 'components', 'routes', 'types'];

    for (const subdir of subdirectories) {
      await fs.ensureDir(path.join(featureDirectory, subdir));
      await fs.writeFile(path.join(featureDirectory, subdir, 'index.ts'), '');
    }

    await fs.writeFile(
      path.join(featureDirectory, 'routes', `${featureName}.tsx`),
      `
        import React from 'react';

          const ${featureName} = () => {
          // Route logic goes here
          };

        export default ${featureName};
      `
    );

    await fs.writeFile(
      path.join(featureDirectory, 'index.ts'),
      `export { default as ${featureName} } from './routes/${featureName}';`
    );

    console.log(chalk.green('Feature files generated successfully!'));
  });

program.parse(process.argv);
