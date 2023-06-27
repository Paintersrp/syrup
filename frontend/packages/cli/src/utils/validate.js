import { CLIError } from './errors.js';
import { Logger } from './logger.js';

const validateName = (name) => {
  if (!name || !name.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
    Logger.error(
      new CLIError(
        'Invalid name. The name must start with a letter and can only contain letters and numbers.'
      )
    );
  }
  return name;
};

const validateNumber = (value) => {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    return 'Please enter a valid number.';
  }
  return true;
};

export { validateName, validateNumber };
