import Router from 'koa-router';
import { FindAndCountOptions } from 'sequelize';

import { MixinOptions, SyMixin } from './SyMixin';

/**
 * TODO:
 * Queries
 * Pagination
 * Filtering/Sorting
 */

export class SyListMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: MixinOptions) {
    super(options);
  }

  /**
   * Retrieves all instances of the model with pagination support.
   */
  public async all(ctx: Router.RouterContext) {
    try {
      const options: FindAndCountOptions = {};

      const { count, rows } = await this.model.findAndCountAll(options);

      ctx.body = {
        count,
        data: rows,
      };
    } catch (error) {
      this.logger.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error', log: error };
    }
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  public async read(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const item = await this.model.findByPk(id);
      if (!item) {
        ctx.status = 404;
        ctx.body = { error: 'Item not found' };
        return;
      }
      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
}
