import Router from 'koa-router';
import validator from 'validator';
import { Logger } from 'pino';
import { ModelStatic, ValidationError, FindOptions, Transaction } from 'sequelize';

import { HttpStatus, ResponseMessages } from '../../lib';
import { SyClientError, SyError } from '../../SyError';
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
  protected createResponse(ctx: Router.RouterContext, status: HttpStatus, body: any) {
    ctx.status = status;
    ctx.body = body;
  }

  /**
   * Handles and logs errors.
   * Sets the HTTP status and error message in the Koa Router context.
   * @param {Router.RouterContext} ctx - The Koa Router context.
   * @param {any} error - The error to be handled.
   */
  protected handleError(ctx: Router.RouterContext, error: any) {
    if (error instanceof ValidationError) {
      ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
      ctx.body = { error: error.message };
    } else if (error instanceof SyError) {
      ctx.status = error.status;
      ctx.body = error.toResponse();
    } else {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = { error: 'Internal server error' };
    }

    this.logger.error(error.message, { error });
  }

  /**
   * Checks if an id is provided and throws an error if it's not.
   *
   * @param {string} id - The id to be checked.
   *
   * @throws {SyClientError} - Throws an error if the id is not provided.
   */
  protected throwIfNoId(id: string) {
    if (!id) {
      throw new SyClientError(HttpStatus.BAD_REQUEST, ResponseMessages.ID_FAIL);
    }
  }

  /**
   * Checks if an array of ids is provided and throws an error if it's not.
   *
   * @param {string[]} ids - The ids to be checked.
   *
   * @throws {SyClientError} - Throws an error if the ids are not provided.
   */
  protected throwIfNoIds(ids: string[]) {
    if (!ids) {
      throw new SyClientError(HttpStatus.BAD_REQUEST, ResponseMessages.IDS_FAIL);
    }
  }

  /**
   * Finds an item by id in the model. If the item is not found, an error is thrown.
   *
   * @param {string} id - The id of the item to be found.
   * @param {Transaction} transaction - The Sequelize transaction.
   *
   * @returns {Promise<any>} - Returns a promise that resolves to the found item.
   *
   * @throws {SyClientError} - Throws an error if the item is not found.
   */
  protected async findItemById(id: string, transaction?: Transaction): Promise<any> {
    const item = await this.model.findByPk(id, { transaction });
    if (!item) {
      throw new SyClientError(HttpStatus.NOT_FOUND, ResponseMessages.ITEM_FAIL);
    }
    return item;
  }

  /**
   * Processes request query parameters for pagination, sorting, and filtering.
   * Converts the page and pageSize to offset and limit for Sequelize.
   * Filter query by using column and filter query params
   *
   * @param {Router.RouterContext} ctx - The Koa Router context.
   * @returns {Promise<FindOptions>} - The Sequelize FindOptions.
   */
  protected async processQueryParams(ctx: Router.RouterContext): Promise<FindOptions> {
    const query = ctx.request.query as Partial<ControllerQueryOptions>;
    const findOptions: FindOptions = {};

    if (query) {
      const page = query.page || 1;
      const pageSize = query.pageSize || 10;
      findOptions.offset = (page - 1) * pageSize;
      findOptions.limit = pageSize;

      if (query.sort && this.isValidSortOption(query.sort)) {
        findOptions.order = [[query.sort, query.sortOrder || 'ASC']];
      }

      if (query.filter && query.column && this.isValidFilterColumn(query.column)) {
        findOptions.where = { [query.column]: query.filter };
      }
    }

    return findOptions;
  }

  /**
   * Validates whether the filter column exists in the model.
   * Ensures that the column input is alphanumeric and exists in the model.
   *
   * @param {string} column The column to be validated.
   * @returns {boolean} A boolean indicating whether the column is valid.
   */
  private isValidFilterColumn(column: string): boolean {
    const validColumns = Object.keys(this.model.getAttributes());
    return validator.isAlphanumeric(column) && validColumns.includes(column);
  }

  /**
   * Validates whether the sort option is valid.
   * Ensures that the sort option is alphanumeric and is either 'asc' or 'desc'.
   *
   * @param {string} sort The sort option to be validated.
   * @returns {boolean} A boolean indicating whether the sort option is valid.
   */
  private isValidSortOption(sort: string): boolean {
    const validSortOptions = ['asc', 'desc'];
    return validator.isAlphanumeric(sort) && validSortOptions.includes(sort.toLowerCase());
  }
}
