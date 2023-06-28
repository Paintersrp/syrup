import { Logger } from './logger.js';

/**
 * Validates the name of a component, feature, hook, or store.
 *
 * @param {string} name - The name to validate.
 * @returns {string} - The validated name.
 *
 * @throws {Logger.error} If the name is invalid.
 */
const validateName = (name) => {
  if (!name || !name.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
    Logger.error(
      'Invalid name. The name must start with a letter and can only contain letters and numbers.'
    );
  }
  return name;
};

/**
 * Validates that the passed-in value is a number; otherwise, requests reinput.
 *
 * @param {number} value - The value to validate.
 * @returns {(boolean|string)} - Returns true if the value is a number, otherwise an error message.
 */
const validateNumber = (value) => {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    return 'Please enter a valid number.';
  }
  return true;
};

export { validateName, validateNumber };
