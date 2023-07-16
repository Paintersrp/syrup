import Koa from 'koa';

import { Views } from '../root';
import { User } from './models';
import { UserSchema } from './schema';

export class UserViews extends Views {
  public static model = User;
  static options = {};

  constructor(app: Koa) {
    super(User, User.viewSchema, app);
  }
}
