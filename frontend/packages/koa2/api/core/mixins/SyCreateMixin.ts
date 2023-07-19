import Router from 'koa-router';
import { ModelStatic, Optional, Model } from 'sequelize';

import { SyMixin } from './SyMixin';

/**
 * TODO:
 * Bulk Create
 */

export class SyCreateMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param model A Sequelize model representing the database table.
   */
  constructor(model: ModelStatic<Model>) {
    super(model);
  }

  /**
   * Creates a new instance of the model.
   */
  public async create(ctx: Router.RouterContext) {
    try {
      const fields = ctx.request.body as Optional<any, string> | undefined;
      const item = await this.model.create(fields);
      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
}
