import Koa from 'koa';
import Router from 'koa-router';
import { Logger } from 'pino';
import { ModelStatic, Optional, Model } from 'sequelize';

import { Log, Monitor } from './decorators/views';
import {
  SyCreateMixin,
  SyDeleteMixin,
  SyListMixin,
  SyMiddlewareMixin,
  SyUpdateMixin,
} from './mixins';
import { SyModel } from './SyModel';

export abstract class SyController {
  protected model: ModelStatic<any>;
  protected schema: any;
  protected logger: Logger;

  protected createMixin: SyCreateMixin;
  protected listMixin: SyListMixin;
  protected updateMixin: SyUpdateMixin;
  protected deleteMixin: SyDeleteMixin;
  protected middlewareMixin: SyMiddlewareMixin;

  /**
   * Constructs a new instance of the Controller class.
   * @param model A Sequelize model representing the database table.
   * @param schema A Joi object schema used for validating request body data.
   * @param logger The instance of application logger.
   */
  constructor(model: ModelStatic<Model>, schema: any, logger: Logger) {
    this.model = model;
    this.schema = schema;
    this.logger = logger;

    this.createMixin = new SyCreateMixin({ model, logger: this.logger });
    this.listMixin = new SyListMixin({ model, logger: this.logger });
    this.updateMixin = new SyUpdateMixin({ model, logger: this.logger });
    this.deleteMixin = new SyDeleteMixin({ model, logger: this.logger });
    this.middlewareMixin = new SyMiddlewareMixin({ model, logger: this.logger, schema });
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
   * If `skip` query parameter is set to 'true', the cache is skipped and the endpoint is processed * normally.
   */
  async cacheEndpoint(ctx: Router.RouterContext, next: Koa.Next) {
    return this.middlewareMixin.cacheEndpoint(ctx, next);
  }

  /**
   * Retrieves all instances of the model with pagination support.
   */
  @Monitor
  @Log
  async all(ctx: Router.RouterContext) {
    return this.listMixin.all(ctx);
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  async read(ctx: Router.RouterContext) {
    return this.listMixin.read(ctx);
  }

  /**
   * Creates a new instance of the model.
   * Validated with validateBody class middleware
   */
  async create(ctx: Router.RouterContext) {
    return this.createMixin.create(ctx);
  }

  /**
   * Updates a specific instance of the model by its ID.
   * Validated with validateBody class middleware
   */
  async update(ctx: Router.RouterContext) {
    return this.updateMixin.update(ctx);
  }

  /**
   * Deletes a specific instance of the model by its ID.
   */
  async delete(ctx: Router.RouterContext) {
    return this.deleteMixin.delete(ctx);
  }
}
