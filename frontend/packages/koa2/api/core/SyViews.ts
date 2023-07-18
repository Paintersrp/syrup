import Koa from 'koa';
import Router from 'koa-router';
import { ModelStatic, FindAndCountOptions, Optional, Model } from 'sequelize';

import { SyModel } from './SyModel';

// Skip pagination?
// @Log
// @Cache(60000)

export abstract class SyViews {
  protected model: ModelStatic<any>;
  protected router: Router;
  protected schema: any;

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

    // Bind Methods
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.validateBody = this.validateBody.bind(this);

    // Add Model Routes to Koa Application Router
    this.router.post(`/${this.model.tableName}`, this.validateBody, this.create);
    this.router.get(`/${this.model.tableName}/:id`, this.read);
    this.router.put(`/${this.model.tableName}/:id`, this.validateBody, this.update);
    this.router.delete(`/${this.model.tableName}/:id`, this.delete);
    this.router.get(`/${this.model.tableName}`, this.getAll);
    // query?

    this.addToApp(app);
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  private async read(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const item = await this.model.findByPk(id);
      if (!item) {
        ctx.status = 404;
        ctx.body = { error: 'Item not found' };
        return;
      }
      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  /**
   * Creates a new instance of the model.
   * Validated with validateBody class middleware
   */
  private async create(ctx: Router.RouterContext) {
    try {
      const fields = ctx.request.body as Optional<any, string> | undefined;
      const item = await this.model.create(fields);
      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  /**
   * Updates a specific instance of the model by its ID.
   * Validated with validateBody class middleware
   */
  private async update(ctx: Router.RouterContext) {
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
  // @Rollback
  private async updateWithRollback(item: any, fields: Optional<any, string> | undefined) {
    Object.assign(item, fields);
    await item.save();
  }

  /**
   * Deletes a specific instance of the model by its ID.
   */
  private async delete(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const item = await this.model.findByPk(id);

      if (!item) {
        ctx.status = 404;
        ctx.body = { error: 'Item not found' };
        return;
      }

      await item.destroy();
      ctx.body = { message: 'Item deleted successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  /**
   * Retrieves all instances of the model with pagination support.
   */
  // @Throttle(10, 60000)
  // @Catch
  // @Monitor
  // @Compress
  private async getAll(ctx: Router.RouterContext) {
    try {
      const options: FindAndCountOptions = {};

      const { count, rows } = await this.model.findAndCountAll(options);

      ctx.body = {
        count,
        data: rows,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error', log: error };
    }
  }

  /**
   * Adds the router routes and allowed methods to the Koa application.
   * @param app The Koa application.
   */
  public addToApp(app: Koa) {
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

  public async validate(fields: Optional<any, string>) {
    await this.schema.validate(fields, { abortEarly: false });
  }

  /**
   * Middleware to validate the request body against the defined schema.
   * @param ctx The Koa RouterContext object.
   * @param next The next middleware function.
   */
  private validateBody(ctx: Router.RouterContext, next: Koa.Next) {
    const fields = ctx.request.body as Optional<any, string> | undefined;

    const { error } = this.schema.validate(fields, { abortEarly: false });
    if (error) {
      ctx.status = 400;
      ctx.body = { error: error.details[0].message };
      return;
    }

    return next();
  }
}
