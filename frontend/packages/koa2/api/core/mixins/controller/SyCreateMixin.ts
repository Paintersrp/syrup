import Router from 'koa-router';
import { Optional, Transaction } from 'sequelize';
import { HttpStatus } from '../../lib';

import { SyMixin } from './SyMixin';
import { ControllerMixinOptions } from '../../types/controller';

/**
 * SyCreateMixin is a mixin class which extends the abstract SyMixin.
 * It provides functionality for creating instances of a model, including single
 * and bulk creations.
 *
 * @class SyCreateMixin
 * @extends {SyMixin}
 */
export class SyCreateMixin extends SyMixin {
  /**
   * Creates an instance of SyCreateMixin.
   *
   * @param {MixinOptions} options - The options to initiate the Mixin class.
   * @constructor
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Creates a new instance of the model.
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async create(ctx: Router.RouterContext, transaction: Transaction) {
    const fields = ctx.request.body as Optional<any, string> | undefined;

    try {
      const item = await this.model.create(fields, { transaction });
      this.createResponse(ctx, HttpStatus.CREATED, item);
    } catch (error) {
      this.handleError(ctx, error);
    }
  }

  /**
   * Creates multiple instances of the model.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async bulkCreate(ctx: Router.RouterContext, transaction: Transaction) {
    const items = ctx.request.body as Optional<any, string>[];

    if (!Array.isArray(items)) {
      this.createResponse(ctx, HttpStatus.BAD_REQUEST, { error: 'Request body must be an array' });
      return;
    }

    try {
      const createdItems = await this.model.bulkCreate(items, { transaction });
      this.createResponse(ctx, HttpStatus.CREATED, createdItems);
    } catch (error) {
      this.handleError(ctx, error);
    }
  }
}
