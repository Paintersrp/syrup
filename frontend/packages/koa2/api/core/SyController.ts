import Koa, { EventEmitter, Middleware } from 'koa';
import Router from 'koa-router';
import { Logger } from 'pino';
import { ModelStatic, Optional, Transaction, DataTypes } from 'sequelize';
import { ORM } from '../settings';

import { ETag, Log, Monitor } from './decorators/controllers';

import {
  SyCreateMixin,
  SyDeleteMixin,
  SyListMixin,
  SyMiddlewareMixin,
  SyUpdateMixin,
} from './mixins/controller';
import { SyModel } from './SyModel';
import { SyControllerOptions } from './types/controller';

/**
 * @class SyController
 * @classdesc SyController is a class responsible for handling HTTP requests and responses.
 * It includes advanced features such as input validation, transaction management, logging, rate limiting, and more.
 *
 * It's highly flexible and can be easily extended or customized for your specific needs.
 *
 * @example
 * class UserController extends SyController {
 *   constructor({options}) {
 *     super(options);
 *     // add custom logic here
 *   }
 * }
 *
 * const userController = new UserController({
 *   model: UserModel,
 *   schema: UserSchema,
 *   logger: pino(),
 * });
 *
 * userRouter.get('/users/:id', userController.read);
 */
export abstract class SyController extends EventEmitter {
  protected model: ModelStatic<any>;
  protected schema: any;
  protected logger: Logger;
  protected customMiddlewares: Middleware[];

  protected createMixin: SyCreateMixin;
  protected listMixin: SyListMixin;
  protected updateMixin: SyUpdateMixin;
  protected deleteMixin: SyDeleteMixin;
  protected middlewareMixin: SyMiddlewareMixin;

  /**
   * @desc Constructs a new instance of the SyController class and initializes the Mixins which
   * provide the main functionality of the SyController. It also binds all the inherited methods
   * from SyController and the inheriting class to the respective instances.
   *
   * @param {ModelStatic<any>} options.model A Sequelize model representing the database table.
   * @param {any} options.schema - A Joi object schema used for validating request body data.
   * @param {Logger} options.logger - The instance of application logger.
   * @param {Middleware[]} [options.middlewares] - An array of custom middlewares to be used in this controller.
   */
  constructor({ model, schema, logger, middlewares = [] }: SyControllerOptions) {
    super();

    this.model = model;
    this.schema = schema;
    this.logger = logger;
    this.customMiddlewares = middlewares;

    this.createMixin = new SyCreateMixin({ model, logger: this.logger });
    this.listMixin = new SyListMixin({ model, logger: this.logger });
    this.updateMixin = new SyUpdateMixin({ model, logger: this.logger });
    this.deleteMixin = new SyDeleteMixin({ model, logger: this.logger });
    this.middlewareMixin = new SyMiddlewareMixin({ model, logger: this.logger, schema });

    Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(this)))
      .filter((prop) => typeof (this as any)[prop] === 'function' && prop !== 'constructor')
      .forEach((method) => {
        (this as any)[method] = (this as any)[method].bind(this);
      });
  }

  /**
   * Wraps a callback function within a database transaction.
   * If any operation within the transaction fails, all operations are rolled back.
   * The error is also emitted as an event and can be listened to.
   * @param {RouterContext} ctx - Koa RouterContext.
   * @param {Function} callback - Callback function to be executed within the transaction.
   * @return {Promise<U>} The result of the callback function execution.
   * @emits SyController#error
   */
  private async withTransaction<U>(
    ctx: Router.RouterContext,
    callback: (transaction: Transaction) => Promise<U>
  ): Promise<U> {
    let transaction: Transaction | null = null;

    try {
      transaction = await ORM.database.transaction();
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }

      this.logger.error(error, 'Transaction failed');
      this.emit('error', error);
      ctx.throw(500, 'Internal server error', { error });
    }
  }

  /**
   * Sets a new Sequelize model for the instance.
   * @param model A Sequelize model representing the database table.
   */
  setModel(model: ModelStatic<SyModel<any, any>>) {
    this.model = model;
  }

  /**
   * Validates field objects using instance schema
   * @param fields An object of input data as fields from a request.
   */
  async validate(fields: Optional<any, string>) {
    await this.schema.validate(fields, { abortEarly: false });
  }

  /**
   * Middleware to validate the request body against the defined schema.
   */
  validateBody(ctx: Router.RouterContext, next: Koa.Next) {
    return this.middlewareMixin.validateBody(ctx, next);
  }

  /**
   * Middleware to cache the response of an endpoint and serve the cached response if available.
   */
  async cacheEndpoint(ctx: Router.RouterContext, next: Koa.Next) {
    return this.middlewareMixin.cacheEndpoint(ctx, next);
  }

  /**
   * Retrieves all instances of the model with pagination support.
   */
  @Monitor
  async all(ctx: Router.RouterContext) {
    return this.listMixin.all(ctx);
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  @Log
  async read(ctx: Router.RouterContext) {
    return this.listMixin.read(ctx);
  }

  /**
   * Creates a new instance of the model.
   */
  async create(ctx: Router.RouterContext) {
    return this.withTransaction(ctx, async (transaction) => {
      return this.createMixin.create(ctx, transaction);
    });
  }

  /**
   * Updates a specific instance of the model by its ID.
   */
  async update(ctx: Router.RouterContext) {
    return this.withTransaction(ctx, async (transaction) => {
      return this.updateMixin.update(ctx, transaction);
    });
  }

  /**
   * Deletes a specific instance of the model by its ID.
   */
  async delete(ctx: Router.RouterContext) {
    return this.withTransaction(ctx, async (transaction) => {
      return this.deleteMixin.delete(ctx, transaction);
    });
  }

  /**
   * Apply middleware to a specific Koa router.
   * @param {Router} router - Koa router where the middleware will be applied.
   * @example
   * userController.applyMiddleware(userRouter);
   */
  applyMiddleware(router: Router) {
    this.customMiddlewares.forEach((middleware) => router.use(middleware));
  }

  /**
   * @method getMetadata
   * @async
   * @description This method is responsible for obtaining metadata of a Sequelize model. The metadata includes
   * attributes (columns) of the model and their types, associations (relations) with other models, and their types.
   * This metadata can be used to dynamically generate UI components, perform validations, or inform other services
   * about the structure of the model.
   *
   * @param {Router.RouterContext} ctx - Koa context. The method sets the ctx.body property with the model's metadata.
   *
   * @returns {Promise<void>} Nothing is explicitly returned but the model's metadata is set to ctx.body.
   *
   * @throws Will throw an error if an issue occurred while trying to fetch the model's attributes or associations.
   */
  @ETag
  async getMetadata(ctx: Router.RouterContext): Promise<void> {
    const attributes = this.model.getAttributes();
    const associations = this.model.associations;

    const structuredAttributes = Object.keys(attributes).map((key) => {
      return {
        name: key,
        type: this.stringifyDataType(attributes[key].type),
        allowNull: attributes[key].allowNull,
      };
    });

    const structuredAssociations = Object.keys(associations).map((key) => {
      return {
        name: key,
        type: associations[key].associationType,
        relatedModel: associations[key].target.name,
      };
    });

    ctx.body = {
      modelName: this.model.name,
      attributes: structuredAttributes,
      associations: structuredAssociations,
    };
  }

  /**
   * @method stringifyDataType
   * @description This method receives a Sequelize DataType object and returns a string representation of it.
   *
   * @param {any} dataType - Sequelize DataType object.
   *
   * @returns {string} String representation of the Sequelize DataType object.
   *
   * @throws Will throw an error if the dataType parameter is null or undefined.
   */
  private stringifyDataType(dataType: any): string {
    switch (dataType.key) {
      case 'ENUM':
        return `ENUM(${(dataType as DataTypes.EnumDataType<string>).values.join(', ')})`;
      case 'STRING':
        return dataType.options
          ? `STRING(${(dataType as DataTypes.StringDataType).options?.length})`
          : 'STRING';
      case 'BIGINT':
        return 'BIGINT';
      case 'FLOAT':
        return 'FLOAT';
      case 'DOUBLE':
        return 'DOUBLE';
      case 'REAL':
        return 'REAL';
      case 'DECIMAL':
        return 'DECIMAL';
      case 'INTEGER':
        return 'INTEGER';
      case 'TEXT':
        return 'TEXT';
      case 'BOOLEAN':
        return 'BOOLEAN';
      case 'DATE':
        return 'DATE';
      case 'ARRAY':
        return 'ARRAY';
      case 'JSON':
        return 'JSON';
      case 'BLOB':
        return 'BLOB';
      default:
        return `UNKNOWN_TYPE: ${dataType.key}`;
    }
  }

  /**
   * @method bindMethods
   * @description This method is responsible for automatically binding the context ('this') to the
   * methods of the inheriting class to their respective instances. This ensures that the methods
   * are always invoked with the correct 'this' value, which corresponds to the class instance they
   * are invoked on.
   *
   * The function iterates over all the method names of the inheriting class, excluding the
   * 'constructor'.
   * It then uses the JavaScript 'bind' function to set the 'this' value of the method to the class
   * instance (also 'this').
   * This makes it so that when these methods are called in the future, they are always executed in
   * the context of the instance they were bound to.
   *
   * It is designed to be called within the constructor of the inheriting class after calling
   * super(), so that the methods of the inheriting class are bound correctly.
   *
   * @returns {void} This method does not return a value.
   */
  protected bindMethods(): void {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter((prop) => typeof (this as any)[prop] === 'function' && prop !== 'constructor')
      .forEach((method) => {
        (this as any)[method] = (this as any)[method].bind(this);
      });
  }
}
