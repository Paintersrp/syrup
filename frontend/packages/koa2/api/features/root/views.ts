import Koa from 'koa';
import Router from 'koa-router';
import Joi from 'joi';

import { ModelStatic, WhereOptions, FindAndCountOptions, Optional } from 'sequelize';
import { Root } from './models';
import { Op } from 'sequelize';
import { Cache, Catch, Compress, Log, Monitor, Rollback, Throttle } from '../../decorators/views';

export class Views {
  private model: ModelStatic<Root>;
  private router: Router;
  private schema: Joi.ObjectSchema;

  constructor(model: ModelStatic<Root>, schema: Joi.ObjectSchema, app: Koa) {
    this.model = model;
    this.router = new Router();
    this.schema = schema;

    this.router.get(`/${this.model.tableName}`, this.getAll.bind(this));
    this.router.get(`/${this.model.tableName}/:id`, this.show.bind(this));
    this.router.post(`/${this.model.tableName}`, this.create.bind(this));
    this.router.put(`/${this.model.tableName}/:id`, this.update.bind(this));
    this.router.delete(`/${this.model.tableName}/:id`, this.destroy.bind(this));

    this.addToApp(app);
  }

  // Skip pagination?
  @Throttle(10, 60000)
  // @Log
  @Catch
  @Monitor
  @Compress
  // @Cache(60000)
  private async getAll(ctx: Router.RouterContext) {
    try {
      const { page = 1, limit = 10, sort, search } = ctx.query;

      const filter = await this.buildFilter(search);
      const order = this.buildOrder(search);

      const options: FindAndCountOptions = {
        where: filter,
        order,
        limit: parseInt(limit as string, 10),
        offset: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
      };

      const { count, rows } = await this.model.findAndCountAll(options);

      const totalPages = Math.ceil(count / parseInt(limit as string, 10));

      ctx.body = {
        count,
        totalPages,
        currentPage: parseInt(page as string, 10),
        pageSize: parseInt(limit as string, 10),
        data: rows,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  private async show(ctx: Router.RouterContext) {
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

  private async create(ctx: Router.RouterContext) {
    try {
      const fields = ctx.request.body as Optional<any, string> | undefined;

      const { error } = this.schema.validate(fields);
      if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
      }
      const item = await this.model.create(fields);
      ctx.body = item;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }

  private async update(ctx: Router.RouterContext) {
    try {
      const { id } = ctx.params;
      const fields = ctx.request.body as Optional<any, string> | undefined;

      const { error } = this.schema.validate(fields);
      if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
      }
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

  @Rollback
  private async updateWithRollback(item: any, fields: Optional<any, string> | undefined) {
    Object.assign(item, fields);
    await item.save();
  }

  private async buildFilter(search: string | string[] | undefined) {
    const filter: WhereOptions = {};

    if (search) {
      const schemaFields = this.schema.describe().children;
      const searchFields = Object.keys(schemaFields).map((field) => ({
        [field]: { [Op.iLike]: `%${search}%` },
      }));
      const orOperator = Op.or as unknown as keyof typeof Op;
      filter[orOperator] = searchFields;
    }

    return filter;
  }

  private async destroy(ctx: Router.RouterContext) {
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

  private buildOrder(sort: string | string[] | undefined) {
    return sort ? (sort as string).split(',') : ['id'];
  }

  public addToApp(app: Koa) {
    app.use(this.router.routes());
    app.use(this.router.allowedMethods());
  }

  public getRouter() {
    return this.router;
  }

  public setModel(model: ModelStatic<Root>) {
    this.model = model;
  }

  public setSchema(schema: Joi.ObjectSchema) {
    this.schema = Joi.object(schema);
  }
}
