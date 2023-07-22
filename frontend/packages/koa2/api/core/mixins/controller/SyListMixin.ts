import Router from 'koa-router';
import { ControllerMixinOptions } from '../../types/controller';
import { SyMixin } from './SyMixin';

/**
 * Class providing list-related functionality.
 * @extends SyMixin
 */
export class SyListMixin extends SyMixin {
  /**
   * Constructs a new instance of the SyListMixin class.
   * @param {MixinOptions} options - Options for initiating the Mixin class.
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Retrieves all instances of the model with pagination, sorting, and filtering support.
   */
  public async all(ctx: Router.RouterContext) {
    try {
      const findOptions = await this.processQueryParams(ctx);
      const { count, rows } = await this.model.findAndCountAll(findOptions);

      this.createResponse(ctx, 200, {
        count,
        data: rows,
      });
    } catch (error) {
      this.handleError(ctx, error);
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
        throw this.createError(404, 'Item not found');
      }

      this.createResponse(ctx, 200, item);
    } catch (error) {
      this.handleError(ctx, error);
    }
  }
}
