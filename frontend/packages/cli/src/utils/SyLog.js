import { SyErr } from './SyErr.js';

/**
 * Utility class for logging messages and feedback.
 */
export class SyLog {
  /**
   * @description
   * Log levels with their corresponding labels and colors.
   */
  static levels = {
    info: { label: 'INFO', color: '\x1b[36m' }, // Cyan
    success: { label: 'SUCCESS', color: '\x1b[32m' }, // Green
    warning: { label: 'WARNING', color: '\x1b[33m' }, // Yellow
    error: { label: 'ERROR', color: '\x1b[31m' }, // Red
  };

  /**
   * @description
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
    const logLevels = Object.keys(SyLog.levels);
    if (!logLevels.includes(level)) {
      SyLog.error(`Invalid log level: ${level}. Valid levels are: ${logLevels.join(', ')}`);
    }

    const { label, color } = SyLog.levels[level];
    const logMessage = `${color}[${label}] ${message}\x1b[0m`; // x1b[0m resets color
    console.log(logMessage);
  }

  /**
   * @description
   * Logs a formatted message with generation statistics about what was just generated.
   *
   * @param {array} templatesUsed - Array of template names used in generation.
   * @returns {void}
   */
  static logStats(templatesUsed) {
    const { label, color } = SyLog.levels['info'];

    const { totalLines, totalFiles } = templatesUsed.reduce(
      (acc, template) => {
        const lines = SyLog.countLines(template);

        acc.totalLines += lines;
        acc.totalFiles++;

        return acc;
      },
      { totalLines: 0, totalFiles: 0 }
    );

    const logLineMessage = `${color}[${label}] Lines of Code Generated: ${totalLines}\x1b[0m`;
    const logFileMessage = `${color}[${label}] Files Generated: ${totalFiles}\x1b[0m`;
    console.log(logLineMessage);
    console.log(logFileMessage);
  }

  /**
   * @description
   * Handle and log errors. If the error is an instance of SyError,
   * log the error message and exit with the error code. Otherwise,
   * log an unexpected error message and stack trace, and exit with
   * a generic error code (1).
   *
   * @param {Error} error - The error object to handle.
   * @param {string} [additionalMessage] - Additional error message to display.
   * @returns {void}
   */
  static error(error, additionalMessage) {
    const { label, color } = SyLog.levels.error;
    const errorMessage = `${color}[${label}] Error: ${error}\x1b[0m`;

    console.error(errorMessage);
    if (additionalMessage) {
      console.error(`${color}[${label}] ${additionalMessage}\x1b[0m`);
    }

    if (error instanceof SyErr) {
      process.exit(error.code);
    } else {
      process.exit(1);
    }
  }

  /**
   * @description
   * Counts the number of lines in a template.
   *
   * @param {string} template - The template content.
   * @returns {number} - The number of lines in the template.
   */
  static countLines(template) {
    const templateLines = template.split('\n');
    const lineCount = templateLines.length - 1;

    return lineCount;
  }
}
