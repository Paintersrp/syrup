import Router from 'koa-router';
import { Op } from 'sequelize';
import { Transaction } from 'sequelize';
import { SyMixin } from './SyMixin';
import { ControllerMixinOptions } from '../../types/controller';
import { HttpStatus, ResponseMessages } from '../../lib';
import { SyClientError } from '../../SyError';

interface BulkDeleteBody {
  ids: string[];
}

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

    try {
      this.throwIfNoId(id);

      const item = await this.findItemById(id, transaction);
      const updatedItem = await item.update({ deleted: true }, { transaction });

      if (updatedItem.get('deleted') === true) {
        this.createResponse(ctx, HttpStatus.OK, ResponseMessages.SOFT_DEL_OK);
      } else {
        throw new SyClientError(
          HttpStatus.BAD_REQUEST,
          ResponseMessages.SOFT_DEL_FAIL,
          updatedItem
        );
      }
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
  async delete(ctx: Router.RouterContext, transaction: Transaction) {
    const { id } = ctx.params;

    try {
      this.throwIfNoId(id);

      const item = await this.findItemById(id, transaction);
      await item.destroy({ transaction });

      this.createResponse(ctx, HttpStatus.OK, ResponseMessages.DEL_OK);
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
    const { ids } = ctx.request.body as BulkDeleteBody;

    try {
      this.throwIfNoIds(ids);

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
        const errorDetails = `Received IDs: ${ids}`;
        throw new SyClientError(HttpStatus.NOT_FOUND, ResponseMessages.ITEMS_FAIL, errorDetails);
      } else {
        this.createResponse(ctx, HttpStatus.OK, ResponseMessages.SOFT_DELS_OK);
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
    const { ids } = ctx.request.body as BulkDeleteBody;

    try {
      this.throwIfNoIds(ids);

      await this.model.destroy({
        where: { id: ids },
        transaction,
      });

      this.createResponse(ctx, HttpStatus.NO_CONTENT, ResponseMessages.DELS_OK);
    } catch (error) {
      this.handleError(ctx, error);
    }
  }
}
