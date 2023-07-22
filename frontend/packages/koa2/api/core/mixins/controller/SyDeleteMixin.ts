import Router from 'koa-router';
import { Op } from 'sequelize';
import { Transaction } from 'sequelize';
import { SyMixin } from './SyMixin';
import { ControllerMixinOptions } from '../../types/controller';

/**
 * SyDeleteMixin is an advanced and comprehensive class which extends SyMixin.
 * It provides functionalities for delete operations including soft delete, hard delete,
 * and bulk delete. It also includes a mechanism for two-step deletion (soft delete
 * before hard delete).
 *
 * @class SyDeleteMixin
 * @extends {SyMixin}
 */
export class SyDeleteMixin extends SyMixin {
  /**
   * Creates an instance of SyDeleteMixin.
   *
   * @param {MixinOptions} options - The options to initiate the Mixin class.
   * @constructor
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Soft deletes a specific instance of the model by its ID. Soft delete only marks the item as deleted but doesn't remove it from the database.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async softDelete(ctx: Router.RouterContext, transaction: Transaction) {
    const { id } = ctx.params;
    const item = await this.model.findByPk(id, { transaction });

    if (!item) {
      this.createResponse(ctx, 404, 'Item not found');
      return;
    }

    try {
      await item.update({ deleted: true }, { transaction });
      this.createResponse(ctx, 200, 'Item soft deleted successfully');
    } catch (error) {
      this.handleError(ctx, error);
    }
  }

  /**
   * Deletes a specific instance of the model by its ID.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async delete(ctx: Router.RouterContext, transaction: Transaction) {
    const { id } = ctx.params;
    const item = await this.model.findByPk(id, { transaction });

    if (!item) {
      this.createResponse(ctx, 404, 'Item not found');
      return;
    }

    try {
      await item.destroy({ transaction });
      this.createResponse(ctx, 200, 'Item deleted successfully');
    } catch (error) {
      this.handleError(ctx, error);
    }
  }

  /**
   * Soft deletes a group of items by their IDs.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async bulkSoftDelete(ctx: Router.RouterContext, transaction: Transaction) {
    const { ids } = ctx.request.body as { ids: { [key: string]: number } };

    try {
      const deletedItems = await this.model.update(
        { deleted: true },
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
          transaction,
        }
      );

      if (deletedItems[0] === 0) {
        this.createResponse(ctx, 404, 'No matching items found');
      } else {
        this.createResponse(ctx, 200, `${deletedItems[0]} items soft deleted successfully`);
      }
    } catch (error) {
      this.handleError(ctx, error);
    }
  }

  /**
   * Deletes a group of items by their IDs.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async bulkDelete(ctx: Router.RouterContext, transaction: Transaction) {
    const { ids } = ctx.request.body as { ids: { [key: string]: number } };

    try {
      await this.model.destroy({
        where: { id: ids },
        transaction,
      });

      this.createResponse(ctx, 200, 'Items deleted successfully');
    } catch (error) {
      this.handleError(ctx, error);
    }
  }
}
