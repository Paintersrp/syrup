import { SyErr } from './SyErr.js';

/**
 * Utility class for validating strings and values.
 */
export class SyVal {
  /**
   * @description
   * Validates the name of a component, feature, hook, or store.
   *
   * @param {string} name - The name to validate.
   * @returns {string} - The validated name.
   *
   * @throws {Error} If the name is invalid.
   */
  static name(name) {
    if (!name || !name.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
      throw new SyErr(
        'Invalid name. The name must start with a letter and can only contain letters and numbers.'
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
  static number(value) {
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
  static directory(directoryName) {
    const validRegex = /^[a-zA-Z0-9-]+$/;
    return validRegex.test(directoryName);
  }
}
