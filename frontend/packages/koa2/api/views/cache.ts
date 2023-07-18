import Koa from 'koa';

import { SyViews } from '../core/SyViews';
import { Cache } from '../models/cache';
import { CacheSchema } from '../schemas';

export class CacheViews extends SyViews {
  static options = {};

  constructor(app: Koa) {
    super(Cache, CacheSchema, app);
  }
}
