import fs from 'fs-extra';

/**
 * Generates a file with the specified content and adds it to the provided file list.
 *
 * @param {string} filePath - The path of the file to be generated.
 * @param {string} content - The content to be written to the file.
 * @param {string[]} fileList - The array to which the generated file path will be added.
 * @returns {Promise<void>} - A promise that resolves when the file generation is complete.
 */
export const generateFile = async (filePath, content, fileList) => {
  await fs.writeFile(filePath, content);
  fileList.push(filePath);
};
