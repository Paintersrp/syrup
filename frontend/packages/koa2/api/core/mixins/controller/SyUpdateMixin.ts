import Router from 'koa-router';
import { Optional, Transaction } from 'sequelize';
import { HttpStatus } from '../../lib';
import { ControllerMixinOptions } from '../../types/controller';
import { SyMixin } from './SyMixin';

/**
 * SyUpdateMixin is a mixin class that extends the base SyMixin class and
 * provides methods for updating and bulk updating instances of a model.
 *
 * This class assumes that you have a model with fields that can be updated,
 * and a HTTP context object (`ctx`) which has been validated with a middleware.
 *
 * @example
 * ```typescript
 * const options: ControllerMixinOptions = {
 *   model: sequelize.model('MyModel'),
 *   // additional options...
 * };
 * const myMixin = new SyUpdateMixin(options);
 *
 * // Use `myMixin` in your Koa middleware functions.
 * router.post('/update/:id', async (ctx, next) => {
 *   await myMixin.update(ctx);
 *   await next();
 * });
 * ```
 *
 * @see {@link SyMixin} for the base class.
 * @see {@link ControllerMixinOptions} for the options to pass to the constructor.
 */
export class SyUpdateMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param {ControllerMixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Updates a specific instance of the model by its ID.
   * Validated with validateBody class middleware
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   *
   * @throws Will throw an error if the item does not exist.
   *
   * @example
   * ```typescript
   * // In your Koa route handler...
   * await myMixin.update(ctx, transaction);
   * ```
   */
  public async update(ctx: Router.RouterContext, transaction: Transaction) {
    try {
      const { id } = ctx.params;
      const fields = ctx.request.body as Optional<any, string> | undefined;
      const item = await this.model.findByPk(id, { transaction });

      if (!item) {
        throw this.createError(HttpStatus.NOT_FOUND, 'Item not found');
      }

      Object.assign(item, fields);
      await item.save({ transaction });

      this.createResponse(ctx, HttpStatus.OK, item);
    } catch (error) {
      this.handleError(ctx, error);
    }
  }

  /**
   * Bulk update instances of the model.
   *
   * This method assumes that the request body is an array of objects, each
   * having an `id` field specifying which instance to update.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   *
   * @throws Will throw an error if an item does not exist or the payload is invalid.
   *
   * @example
   * ```typescript
   * // In your Koa route handler...
   * await myMixin.bulkUpdate(ctx, transaction);
   * ```
   */
  public async bulkUpdate(ctx: Router.RouterContext, transaction: Transaction) {
    try {
      const fields = ctx.request.body as Optional<any, string>[] | undefined;

      if (fields) {
        const updatedItems = await Promise.all(
          fields.map(async (item: any) => {
            const currentItem = await this.model.findByPk(item.id, { transaction });
            if (!currentItem) {
              throw this.createError(HttpStatus.NOT_FOUND, `Item not found with id ${item.id}`);
            }

            Object.assign(currentItem, item);
            await currentItem.save({ transaction });

            return currentItem;
          })
        );
        ctx.status = HttpStatus.OK;
        ctx.body = updatedItems;
      } else {
        this.createError(HttpStatus.BAD_REQUEST, 'Invalid Payload');
      }
    } catch (error) {
      this.handleError(ctx, error);
    }
  }
}
