import Koa from 'koa';

import { Views } from '../root';
import { User, userSchema } from './models';

export class UserViews extends Views {
  public static model = User;
  static options = {};
  static schema = userSchema;

  constructor(app: Koa) {
    super(User, userSchema, app);
  }
}
