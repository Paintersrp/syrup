import Koa from 'koa';

import { SyViews } from '../core/SyViews';
import { Profile } from '../models/profile';
import { ProfileSchema } from '../schemas';

export class ProfileViews extends SyViews {
  static options = {};

  constructor(app: Koa) {
    super(Profile, ProfileSchema, app);
  }
}
