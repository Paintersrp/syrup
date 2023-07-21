import Router from 'koa-router';
import { MixinOptions, SyMixin } from './SyMixin';

/**
 * TODO:
 * Bulk Delete
 */

export class SyDeleteMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: MixinOptions) {
    super(options);
  }

  /**
   * Deletes a specific instance of the model by its ID.
   */
  public async delete(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const item = await this.model.findByPk(id);

      if (!item) {
        ctx.status = 404;
        ctx.body = { error: 'Item not found' };
        return;
      }

      await item.destroy();
      ctx.body = { message: 'Item deleted successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
}
