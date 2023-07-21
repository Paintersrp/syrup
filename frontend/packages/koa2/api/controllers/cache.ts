import { Logger } from 'pino';

import { SyController } from '../core/SyController';
import { Cache } from '../models/cache';
import { CacheSchema } from '../schemas';

export class CacheController extends SyController {
  static options = {};

  /**
   * Creates an instance of the Cache Controller.
   * @param {Logger} logger The application logger instance.
   */
  constructor(logger: Logger) {
    super(Cache, CacheSchema, logger);
  }
}
