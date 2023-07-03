import path from 'path';
import fs from 'fs-extra';
import prettier from 'prettier';

import { SyLog } from './SyLog.js';
import { handleError } from './error.js';

/**
 * Utility class for generating files and folders
 */
export class SyGen {
  constructor() {
    this.fileTemplates = [];
    this.templatesUsed = [];
  }

  /**
   * @description
   * Ensures existence of directory and logs folder generation.
   *
   * @param {string} dir - The path of the file to be generated.
   * @returns {Promise<void>} - A promise that resolves when the file generation is complete.
   */
  async ensureAndLogDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.ensureDir(dir);
        SyLog.log(` ✔ Generated Directory: ${dir}`, 'success');
      } else {
        SyLog.log(` ✔  Used existing Directory: ${dir}`, 'success');
      }
    } catch (error) {
      handleError(error);
      SyLog.log(`Failed to ensure folder at path: ${dir}`, 'error');
    }
  }

  /**
   * @description
   * Generates a file using the provided template, writes it to the specified file path,
   * and logs the result.
   *
   * @param {string} filePath - The file path and name for the generated file.
   * @param {string} template - The template file content.
   * @param {string[]} templatesUsed - An array to store the used templates.
   * @param {string} displayName - The display name for logging feedback.
   * @returns {Promise<void>} A Promise that resolves when the file generation and logging are complete.
   */
  async generateAndLogFile(filePath, template, displayName) {
    try {
      const prettifiedTemplate = await this.prettifyTemplate(template);
      await fs.writeFile(filePath, prettifiedTemplate);

      this.templatesUsed.push(template);
      SyLog.log(`✔ Generated ${displayName}: ${filePath}`, 'success');
    } catch (error) {
      SyLog.log(`Failed to generate file: ${filePath}`, 'error');
      handleError(error);
    }
  }

  /**
   * @description
   * Adds a file template to the builder.
   *
   * @param {string} template - The template file content.
   * @param {string} fileName - The file path and name for the generated file.
   * @param {string} displayName - The display name for logging feedback.
   * @returns {FileTemplatesBuilder} The current instance of the builder.
   */
  addFileToQueue(template, fileName, displayName) {
    this.fileTemplates.push({ template, fileName, displayName });
    return this;
  }

  /**
   * @description
   * Generates files based on the provided templates, file names, and output directory.
   *
   * @returns {Promise<string[]>} A promise that resolves with an array of the generated file templates.
   */
  async generateQueue() {
    await Promise.all(
      this.fileTemplates.map(async ({ template, fileName, displayName }) => {
        await this.generateAndLogFile(fileName, template, displayName);
      })
    );

    return this.templatesUsed;
  }

  /**
   * @description
   * Prettifies a given template using the specified parser.
   *
   * @param {string} template - The template to prettify.
   * @param {string} parser - The parser to use (default: 'typescript').
   * @returns {Promise<string>} The prettified template.
   * @async
   */
  async prettifyTemplate(template, parser = 'typescript') {
    return prettier.format(template, {
      parser: parser,
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'es5',
    });
  }

  /**
   * @description
   * Generates directories recursively and returns their paths.
   *
   * @param {string[]} directories - The names of the directories to generate.
   * @param {string} targetPath - The target directory path.
   * @returns {Promise<string[]>} The paths of the generated directories.
   * @async
   */
  async genDirectoriesRecursively(directories, targetPath) {
    return directories.reduce(async (accumulatorPromise, directoryName) => {
      const accumulator = await accumulatorPromise;
      const directoryPath = path.join(targetPath, directoryName);
      await this.ensureAndLogDir(directoryPath);
      return [...accumulator, directoryPath];
    }, Promise.resolve([]));
  }
}
