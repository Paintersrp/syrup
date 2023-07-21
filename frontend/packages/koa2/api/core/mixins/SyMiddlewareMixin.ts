import Koa from 'koa';
import Router from 'koa-router';
import { Optional } from 'sequelize';

import { Cache } from '../../models';
import { cache } from '../../settings';
import { MixinOptions, SyMixin } from './SyMixin';

export type MixinMiddleWareOptions = MixinOptions & { schema: any };

/**
 * TODO:
 *
 */

export class SyMiddlewareMixin extends SyMixin {
  protected schema: any;

  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   * @param schema A Joi object schema used for validating request body data.
   */
  constructor(options: MixinMiddleWareOptions) {
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
      ctx.status = 400;
      ctx.body = { error: error.details[0].message };
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
      cacheKey,
      response: ctx.body as JSON,
      createdAt: new Date(),
    });
  }

  /**
   * Update the existing cache entry for the given cache key with the updated response.
   * @param cacheKey The cache key.
   */
  public async updateCache(ctx: Router.RouterContext, cacheKey: string) {
    const cachedResponse = await Cache.findOne({
      where: { cacheKey },
    });

    if (cachedResponse) {
      await cachedResponse.update({ response: ctx.body as JSON });
    }
  }
}
