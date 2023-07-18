import Koa from 'koa';

import { SyViews } from '../core/SyViews';
import { Blacklist } from '../models/blacklist';
import { BlacklistSchema } from '../schemas/blacklist';

export class BlacklistViews extends SyViews {
  static model = Blacklist;
  static options = {};

  constructor(app: Koa) {
    super(Blacklist, BlacklistSchema, app);
  }
}
