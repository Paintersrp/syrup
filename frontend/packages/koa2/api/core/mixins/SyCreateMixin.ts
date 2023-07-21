import Router from 'koa-router';
import { Optional } from 'sequelize';

import { MixinOptions, SyMixin } from './SyMixin';

/**
 * TODO:
 * Bulk Create
 */

export class SyCreateMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: MixinOptions) {
    super(options);
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
