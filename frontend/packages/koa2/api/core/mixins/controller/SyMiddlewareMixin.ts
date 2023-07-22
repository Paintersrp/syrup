import Koa from 'koa';
import Router from 'koa-router';
import { Optional } from 'sequelize';
import { Cache } from '../../../models';
import { cache } from '../../../settings';
import { HttpStatus } from '../../lib';
import { ControllerMixinMiddlewareOptions } from '../../types/controller';
import { SyMixin } from './SyMixin';

/**
 * SyMiddlewareMixin is a mixin class that extends the base SyMixin.
 * It provides middleware functions for request validation and caching, including bulk operations.
 *
 * @class SyMiddlewareMixin
 * @extends {SyMixin}
 */
export class SyMiddlewareMixin extends SyMixin {
  protected schema: any;

  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   * @param schema A Joi object schema used for validating request body data.
   */
  constructor(options: ControllerMixinMiddlewareOptions) {
    super(options);
    this.schema = options.schema;
  }

  /**
   * Middleware to validate the request body against the defined schema.
   */
  public validateBody(ctx: Router.RouterContext, next: Koa.Next) {
    const fields = ctx.request.body as Optional<any, string> | undefined;

    const { error } = this.schema.validate(fields, { abortEarly: false });
    if (error) {
      this.createError(HttpStatus.BAD_REQUEST, error.details[0].message);
      return;
    }

    return next();
  }

  /**
   * Middleware to cache the response of an endpoint and serve the cached response if available.
   * If `skip` query parameter is set to 'true', the cache is skipped and the endpoint is processed * normally.
   */
  public async cacheEndpoint(ctx: Router.RouterContext, next: Koa.Next) {
    const skipAndRefreshCache = ctx.query.skip === 'true';
    const cacheKey = `${ctx.method}-${ctx.url}`;

    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && !skipAndRefreshCache) {
      ctx.body = cachedResponse;
      ctx.set('Content-Type', 'application/json');
      return;
    }

    await next();
    await cache.set(cacheKey, ctx.body, 60);
  }

  /**
   * Create a new cache entry for the given cache key and response.
   * @param cacheKey The cache key.
   */
  public async createCache(ctx: Router.RouterContext, cacheKey: string) {
    await Cache.create({
      contents: ctx.body as JSON,
    });
  }

  /**
   * Update the existing cache entry for the given cache key with the updated response.
   * @param cacheKey The cache key.
   */
  public async updateCache(ctx: Router.RouterContext) {
    const cachedResponse = await Cache.findOne();

    if (cachedResponse) {
      await cachedResponse.update({ contents: ctx.body as JSON });
    }
  }
}
