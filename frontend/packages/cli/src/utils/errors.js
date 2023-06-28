import { Logger } from './logger.js';

/**
 * Custom CLI error class.
 */
class CLIError extends Error {
  /**
   * Creates a new CLIError instance.
   *
   * @param {string} message - The error message.
   * @param {number} code - The error code.
   */
  constructor(message, code) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

/**
 * Handles errors that occur during command execution and logs them using the Logger.
 *
 * @param {Function} fn - The command execution function to wrap.
 * @returns {Promise<void>} - A promise that resolves when the command execution is complete.
 */
async function handleCommandError(fn) {
  try {
    await fn();
  } catch (error) {
    Logger.error(error);
  }
}

export { CLIError, handleCommandError };
