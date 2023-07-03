import { SyLog } from './SyLog.js';

/**
 * @description
 * Validates the name of a component, feature, hook, or store.
 *
 * @param {string} name - The name to validate.
 * @returns {string} - The validated name.
 *
 * @throws {Error} If the name is invalid.
 */
export function validateName(name) {
  if (!name || !name.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
    SyLog.log(
      'Invalid name. The name must start with a letter and can only contain letters and numbers.',
      'error'
    );
  }
  return name;
}

/**
 * @description
 * Validates that the passed-in value is a number; otherwise, requests reinput.
 *
 * @param {number} value - The value to validate.
 * @returns {boolean|string} - Returns true if the value is a number, otherwise an error message.
 */
export function validateNumber(value) {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    return 'Please enter a valid number.';
  }
  return true;
}

/**
 * @description
 * Validates a directory name.
 *
 * @param {string} directoryName - The name of the directory to validate.
 * @returns {boolean} - True if the directory name is valid, false otherwise.
 */
export function validateDirectory(directoryName) {
  const validRegex = /^[a-zA-Z0-9-]+$/;
  return validRegex.test(directoryName);
}
