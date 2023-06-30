import { SyLog } from './SyLog.js';

/**
 * Utility class for handling errors.
 */
export class SyErr extends Error {
  /**
   * Creates a new CLIError instance.
   *
   * @param {string} message - The error message.
   * @param {number} code - The error code.
   */
  constructor(message, code) {
    // super(message);
    super();
    this.name = 'SyError';
    this.code = code;
  }

  /**
   * Handles errors that occur during command execution and logs them using the Logger.
   *
   * @param {Function} fn - The command execution function to wrap.
   * @returns {Promise<void>} - A promise that resolves when the command execution is complete.
   */
  static async handle(fn) {
    try {
      await fn();
    } catch (error) {
      SyErr.throw(error.message, error.code);
    }
  }

  /**
   * Handles and logs an error with a custom error message and exits the process with the provided error code.
   *
   * @param {string} message - The custom error message.
   * @param {number} code - The error code.
   * @returns {void}
   */
  static async throw(message, code) {
    const error = new SyErr(message, code);
    SyLog.error(error);
    process.exit(code);
  }
}
