import chalk from 'chalk';
import { CLIError } from './errors.js';

class Logger {
  static levels = {
    info: { label: 'INFO', color: chalk.cyan },
    success: { label: 'SUCCESS', color: chalk.green },
    warning: { label: 'WARNING', color: chalk.yellow },
    error: { label: 'ERROR', color: chalk.red },
  };

  static log(message, level = 'info') {
    const { label, color } = Logger.levels[level] || Logger.levels.info;
    const logMessage = color(`[${label}] ${message}`);
    console.log(logMessage);
  }

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
