import { Logger } from 'pino';

import { SyController } from '../core/SyController';
import { Request } from '../models/request';
import { RequestSchema } from '../schemas';

export class RequestController extends SyController {
  static options = {};

  /**
   * Creates an instance of the Request Controller.
   * @param {Logger} logger The application logger instance.
   */
  constructor(logger: Logger) {
    super(Request, RequestSchema, logger);
  }
}
