import Router from 'koa-router';
import { ModelStatic, Model, Optional } from 'sequelize';
import { Rollback } from '../decorators/views';
import { SyMixin } from './SyMixin';

/**
 * TODO:
 * Bulk Update
 */

export class SyUpdateMixin extends SyMixin {
  /**
   * Constructs a new instance of the Mixin class.
   * @param model A Sequelize model representing the database table..
   */
  constructor(model: ModelStatic<Model>) {
    super(model);
  }

  /**
   * Updates a specific instance of the model by its ID.
   * Validated with validateBody class middleware
   */
  public async update(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const fields = ctx.request.body as Optional<any, string> | undefined;

      const item = await this.model.findByPk(id);
      if (!item) {
        ctx.status = 404;
        ctx.body = { error: 'Item not found' };
        return;
      }

      await this.updateWithRollback(item, fields);

      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  /**
   * Updates the given model instance with the provided fields and performs a rollback in case of an error.
   * @param item The model instance to update.
   * @param fields The fields to update.
   */
  @Rollback
  private async updateWithRollback(item: any, fields: Optional<any, string> | undefined) {
    Object.assign(item, fields);
    await item.save();
  }
}
