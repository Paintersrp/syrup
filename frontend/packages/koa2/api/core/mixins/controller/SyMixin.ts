import Router from 'koa-router';
import { Logger } from 'pino';
import { ModelStatic, ValidationError, FindOptions } from 'sequelize';

import { HttpStatus } from '../../lib';
import { ControllerMixinOptions, ControllerQueryOptions } from '../../types/controller';

/**
 * Abstract class to provide common functionality to other mixins.
 * @class
 */
export abstract class SyMixin {
  protected model: ModelStatic<any>;
  protected logger: Logger;

  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: ControllerMixinOptions) {
    this.model = options.model;
    this.logger = options.logger;
  }

  /**
   * Sets HTTP response status and body.
   * @param {RouterContext} ctx Koa Router context.
   * @param {HttpStatus} status HTTP status code.
   * @param {any} body Response body.
   */
  createResponse(ctx: Router.RouterContext, status: HttpStatus, body: any) {
    ctx.status = status;
    ctx.body = body;
  }

  /**
   * Constructs an error object with HTTP status code.
   * @param {HttpStatus} status HTTP status code.
   * @param {string} message Error message.
   * @returns {Error & { status: HttpStatus }} The constructed error object.
   */
  createError(status: HttpStatus, message: string): Error & { status: HttpStatus } {
    const err = new Error(message) as Error & { status: HttpStatus };
    err.status = status;
    return err;
  }

  /**
   * Handles and logs errors.
   * Sets the HTTP status and error message in the Koa Router context.
   * @param {Router.RouterContext} ctx - The Koa Router context.
   * @param {any} error - The error to be handled.
   */
  handleError(ctx: Router.RouterContext, error: any) {
    if (error instanceof ValidationError) {
      ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
      ctx.body = { error: error.message };
    } else if (error.status) {
      ctx.status = error.status;
      ctx.body = { error: error.message };
    } else {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = { error: 'Internal server error' };
    }

    this.logger.error(error.message, { error });
  }

  /**
   * Processes request query parameters for pagination, sorting, and filtering.
   * Converts the page and pageSize to offset and limit for Sequelize.
   * Filter query by using column and filter query params
   * @param {Router.RouterContext} ctx - The Koa Router context.
   * @returns {Promise<FindOptions>} - The Sequelize FindOptions.
   */
  async processQueryParams(ctx: Router.RouterContext): Promise<FindOptions> {
    const query = ctx.request.query as Partial<ControllerQueryOptions>;
    const findOptions: FindOptions = {};

    if (query.page && query.pageSize) {
      findOptions.offset = (query.page - 1) * query.pageSize;
      findOptions.limit = query.pageSize;
    }

    if (query.sort) {
      findOptions.order = [[query.sort, query.sortOrder || 'ASC']];
    }

    if (query.filter && query.column) {
      findOptions.where = { [query.column]: query.filter };
    }

    return findOptions;
  }
}
