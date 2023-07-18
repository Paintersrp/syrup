import Koa from 'koa';

import { SyViews } from '../core/SyViews';
import { Request } from '../models/request';
import { RequestSchema } from '../schemas';

export class RequestViews extends SyViews {
  static options = {};

  constructor(app: Koa) {
    super(Request, RequestSchema, app);
  }
}
