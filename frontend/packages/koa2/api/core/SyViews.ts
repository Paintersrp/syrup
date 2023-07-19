import Koa from 'koa';
import Router from 'koa-router';
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

export abstract class SyViews {
  protected model: ModelStatic<any>;
  protected router: Router;
  protected schema: any;

  protected createMixin: SyCreateMixin;
  protected listMixin: SyListMixin;
  protected updateMixin: SyUpdateMixin;
  protected deleteMixin: SyDeleteMixin;
  protected middlewareMixin: SyMiddlewareMixin;

  /**
   * Constructs a new instance of the Views class.
   * @param model A Sequelize model representing the database table.
   * @param schema A Joi object schema used for validating request body data.
   * @param app An instance of Koa application.
   */
  constructor(model: ModelStatic<Model>, schema: any, app: Koa) {
    this.model = model;
    this.router = new Router();
    this.schema = schema;

    /**
     * Initiate Mixin Classes
     */
    this.createMixin = new SyCreateMixin(model);
    this.listMixin = new SyListMixin(model);
    this.updateMixin = new SyUpdateMixin(model);
    this.deleteMixin = new SyDeleteMixin(model);
    this.middlewareMixin = new SyMiddlewareMixin(model, schema);

    /**
     * Bind methods / middlewares for router
     */
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.all = this.all.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.cacheEndpoint = this.cacheEndpoint.bind(this);

    /**
     * Initiate view / model routes with middlewares
     */
    this.router.post(`/${this.model.tableName}`, this.validateBody, this.create);
    this.router.get(`/${this.model.tableName}/:id`, this.read);
    this.router.put(`/${this.model.tableName}/:id`, this.validateBody, this.update);
    this.router.delete(`/${this.model.tableName}/:id`, this.delete);
    this.router.get(`/${this.model.tableName}`, this.cacheEndpoint, this.all);

    /**
     * Add initiated routes and endpoints to application
     */
    this.addRoutesToApp(app);
  }

  /**
   * Adds the router routes and allowed methods to the Koa application.
   * @param app The Koa application.
   */
  public addRoutesToApp(app: Koa) {
    app.use(this.router.routes());
    app.use(this.router.allowedMethods());
  }

  /**
   * @returns The router instance.
   */
  public getRouter() {
    return this.router;
  }

  /**
   * Sets a new Sequelize model for the instance.
   * @param model A Sequelize model representing the database table.
   */
  public setModel(model: ModelStatic<SyModel<any, any>>) {
    this.model = model;
  }

  /**
   * Validates field objects using instance schema
   * @param fields An object of input data as fields from a request.
   */
  public async validate(fields: Optional<any, string>) {
    await this.schema.validate(fields, { abortEarly: false });
  }

  /**
   * Middleware to validate the request body against the defined schema.
   */
  private validateBody(ctx: Router.RouterContext, next: Koa.Next) {
    return this.middlewareMixin.validateBody(ctx, next);
  }

  /**
   * Middleware to cache the response of an endpoint and serve the cached response if available.
   * If `skip` query parameter is set to 'true', the cache is skipped and the endpoint is processed * normally.
   */
  private async cacheEndpoint(ctx: Router.RouterContext, next: Koa.Next) {
    return this.middlewareMixin.cacheEndpoint(ctx, next);
  }

  /**
   * Retrieves all instances of the model with pagination support.
   */
  @Monitor
  @Log
  private async all(ctx: Router.RouterContext) {
    return this.listMixin.all(ctx);
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  private async read(ctx: Router.RouterContext) {
    return this.listMixin.read(ctx);
  }

  /**
   * Creates a new instance of the model.
   * Validated with validateBody class middleware
   */
  private async create(ctx: Router.RouterContext) {
    return this.createMixin.create(ctx);
  }

  /**
   * Updates a specific instance of the model by its ID.
   * Validated with validateBody class middleware
   */
  private async update(ctx: Router.RouterContext) {
    return this.updateMixin.update(ctx);
  }

  /**
   * Deletes a specific instance of the model by its ID.
   */
  private async delete(ctx: Router.RouterContext) {
    return this.deleteMixin.delete(ctx);
  }
}
