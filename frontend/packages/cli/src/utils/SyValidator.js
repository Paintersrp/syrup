import { SyError } from './SyError.js';

/**
 * Utility class for validating strings and values.
 */
export class SyValidator {
  /**
   * Validates the name of a component, feature, hook, or store.
   *
   * @param {string} name - The name to validate.
   * @returns {string} - The validated name.
   *
   * @throws {Error} If the name is invalid.
   */
  static validateName(name) {
    if (!name || !name.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
      throw new SyError(
        'Invalid name. The name must start with a letter and can only contain letters and numbers.'
      );
    }
    return name;
  }

  /**
   * Validates that the passed-in value is a number; otherwise, requests reinput.
   *
   * @param {number} value - The value to validate.
   * @returns {boolean|string} - Returns true if the value is a number, otherwise an error message.
   */
  static validateNumber(value) {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return 'Please enter a valid number.';
    }
    return true;
  }
}
