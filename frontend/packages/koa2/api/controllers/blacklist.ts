import { Logger } from 'pino';

import { SyController } from '../core/SyController';
import { Blacklist } from '../models/blacklist';
import { BlacklistSchema } from '../schemas/blacklist';

export class BlacklistController extends SyController {
  static options = {};

  /**
   * Creates an instance of the Blacklist Controller.
   * @param {Logger} logger The application logger instance.
   */
  constructor(logger: Logger) {
    super(Blacklist, BlacklistSchema, logger);
  }
}
