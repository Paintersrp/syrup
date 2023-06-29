import fs from 'fs-extra';
import { SyError } from './SyError.js';
import { SyLogger } from './SyLogger.js';

/**
 * Utility class for generating files and folders, using SyLogger for messages and feedback
 * as well as SyError for errors.
 */
export class SyGenerator {
  constructor() {
    this.fileTemplates = [];
  }

  /**
   * Ensures existence of directory and logs folder generation.
   *
   * @param {string} dir - The path of the file to be generated.
   * @returns {Promise<void>} - A promise that resolves when the file generation is complete.
   */
  static async ensureAndLogDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.ensureDir(dir);
        SyLogger.log(` ✔ Generated Directory: ${dir}`, 'success');
      } else {
        SyLogger.log(` ✔  Used existing Directory: ${dir}`, 'success');
      }
    } catch (error) {
      SyError.throw(error.message, 1);
      SyLogger.error(`Failed to ensure folder at path: ${dir}`);
    }
  }

  /**
   * Generates a file using the provided template, writes it to the specified file path,
   * and logs the result.
   * @param {string} filePath - The file path and name for the generated file.
   * @param {string} template - The template file content.
   * @param {string[]} templatesUsed - An array to store the used templates.
   * @param {string} displayName - The display name for logging feedback.
   * @returns {Promise<void>} A Promise that resolves when the file generation and logging are complete.
   */
  static async generateAndLogFile(filePath, template, templatesUsed, displayName) {
    try {
      await fs.writeFile(filePath, template);
      templatesUsed.push(template);
      SyLogger.log(`✔ Generated ${displayName}: ${filePath}`, 'success');
    } catch (error) {
      SyLogger.error(`Failed to generate file: ${filePath}`);
      SyError.throw(error.message, error.code);
    }
  }

  /**
   * Adds a file template to the builder.
   * @param {string} template - The template file content.
   * @param {string} fileName - The file path and name for the generated file.
   * @param {string} displayName - The display name for logging feedback.
   * @returns {FileTemplatesBuilder} The current instance of the builder.
   */
  addFileTemplate(template, fileName, displayName) {
    this.fileTemplates.push({ template, fileName, displayName });
    return this;
  }

  /**
   * Generates files based on the provided templates, file names, and output directory.
   * @param {Array} fileTemplates - An array of file templates to be generated.
   * @param {string} outputDirectory - The directory path where the files will be generated.
   * @param {Array} templatesUsed - An array to store the generated file paths.
   * @returns {Promise<void>}
   */
  async generateManyFiles(templatesUsed) {
    await Promise.all(
      this.fileTemplates.map(async ({ template, fileName, displayName }) => {
        await SyGenerator.generateAndLogFile(fileName, template, templatesUsed, displayName);
      })
    );
  }
}
