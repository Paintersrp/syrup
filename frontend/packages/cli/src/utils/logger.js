import chalk from 'chalk';
import { CLIError } from './errors.js';

/**
 * Utility class for logging messages and handling errors.
 */
class Logger {
  /**
   * Log levels with their corresponding labels and colors.
   *
   * @type {Object}
   */
  static levels = {
    info: { label: 'INFO', color: chalk.cyan },
    success: { label: 'SUCCESS', color: chalk.green },
    warning: { label: 'WARNING', color: chalk.yellow },
    error: { label: 'ERROR', color: chalk.red },
  };

  /**
   * Logs a formatted message based on the specified log level.
   *
   * @param {string} message - The message to log.
   * @param {string} [level='info'] - The log level. Valid levels are:
   *   - 'info': Information level.
   *   - 'success': Success level.
   *   - 'warning': Warning level.
   *   - 'error': Error level.
   * @returns {void}
   * @throws {Error} If an invalid log level is provided.
   */
  static log(message, level = 'info') {
    const logLevels = Object.keys(Logger.levels);
    if (!logLevels.includes(level)) {
      throw new Error(`Invalid log level: ${level}. Valid levels are: ${logLevels.join(', ')}`);
    }

    const { label, color } = Logger.levels[level];
    const logMessage = color(`[${label}] ${message}`);
    console.log(logMessage);
  }

  /**
   * Handle and log errors. If the error is an instance of CLIError,
   * log the error message and exit with the error code. Otherwise,
   * log an unexpected error message and stack trace, and exit with
   * a generic error code (1).
   *
   * @param {Error} error - The error object to handle.
   * @returns {void}
   */
  static error(error) {
    if (error instanceof CLIError) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(error.code);
    } else {
      const cliError = new CLIError(error);
      if (cliError instanceof CLIError) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(error.code);
      } else {
        console.error(chalk.red('An unexpected error occurred.'));
        console.error(chalk.red(error.stack));
        process.exit(1);
      }
    }
  }
}

export { Logger };
