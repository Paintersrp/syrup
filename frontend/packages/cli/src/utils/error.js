import { SyLog } from './SyLog.js';

/**
 * @description
 * Handles errors that occur during command execution and logs them using the Logger.
 *
 * @param {Function} fn - The command execution function to wrap.
 * @returns {Promise<void>} - A promise that resolves when the command execution is complete.
 */
export async function handleFunction(fn) {
  try {
    await fn();
  } catch (error) {
    handleError(error);
  }
}

/**
 * @description
 * Handles and logs an error with a custom error message and exits the process with the provided error code.
 *
 * @param {string} message - The custom error message.
 * @param {number} code - The error code.
 * @returns {void}
 */
export async function handleError(error) {
  const { message, code, stack } = error;

  SyLog.log(message, 'error');
  SyLog.log(code, 'error');
  SyLog.log(stack, 'error');
  process.exit(1);
}
