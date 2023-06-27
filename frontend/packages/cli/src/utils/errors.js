import { Logger } from './logger.js';

class CLIError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

async function handleCommandError(fn) {
  try {
    await fn();
  } catch (error) {
    Logger.error(error);
  }
}

export { CLIError, handleCommandError };
