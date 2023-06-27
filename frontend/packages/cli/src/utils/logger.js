import chalk from 'chalk';

import { CLIError } from './errors.js';

class Logger {
  static log(message, level = 'info') {
    const { levelHead, levelChalk } = Logger.getLogLevel(level);
    console.log(levelHead, levelChalk(message));
  }

  static error(error) {
    console.log(error);
    if (error instanceof CLIError) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(error.code);
    } else {
      console.error(chalk.red('An unexpected error occurred.'));
      console.error(chalk.red(error.stack));
      process.exit(1);
    }
  }

  static getLogLevel(level) {
    switch (level) {
      case 'info':
        return { levelHead: chalk.cyan('[INFO]'), levelChalk: chalk.cyan };

      case 'success':
        return { levelHead: chalk.green('[SUCCESS]'), levelChalk: chalk.green };

      case 'warning':
        return { levelHead: chalk.yellow('[WARNING]'), levelChalk: chalk.yellow };

      case 'error':
        return { levelHead: chalk.red('[ERROR]'), levelChalk: chalk.red };

      default:
        return { levelHead: '', levelChalk: chalk.white };
    }
  }
}

export { Logger };
