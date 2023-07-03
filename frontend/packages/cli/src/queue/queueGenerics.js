import path from 'path';

/**
 * @description
 * Queues a generic file.
 *
 * @param {string} name - The name of the file.
 * @param {string} extension - The extension of the file.
 * @param {string} template - The template content of the file.
 * @param {string} directory - The target directory for the file.
 * @param {string} verboseName - The verbose name of the file for logging.
 * @param {SyGen} generator - The generator instance.
 */
export async function queueGenericFile(
  name,
  extension,
  template,
  directory,
  verboseName,
  generator
) {
  const fileName = `${name}.${extension}`;
  const finalDir = path.join(directory, fileName);

  generator.addFileToQueue(template, finalDir, verboseName);
}

/**
 * @description
 * Queue multiple generic files with the same extension and template.
 *
 * @param {string[]} names - An array of file names.
 * @param {string} extension - The file extension.
 * @param {string} template - The content template for the files.
 * @param {string} directory - The directory to queue the files in.
 * @param {string} verboseName - The verbose name for the files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 */
export async function queueManyGenericFiles(
  names,
  extension,
  template,
  directory,
  verboseName,
  generator
) {
  await Promise.all(
    names.map(async (name) => {
      queueGenericFile(name, extension, template, directory, verboseName, generator);
    })
  );
}
