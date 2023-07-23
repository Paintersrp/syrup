import Koa from 'koa';
import Router from 'koa-router';
import { Optional } from 'sequelize';
import * as Yup from 'yup';

import { cache } from '../../../settings';
import { HttpStatus, ResponseMessages } from '../../lib';
import { SyClientError } from '../../SyError';
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
  protected schema: Yup.ObjectSchema<any>;

  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   * @param schema A Yup object schema used for validating request body data.
   */
  constructor(options: ControllerMixinMiddlewareOptions) {
    super(options);
    this.schema = options.schema;
  }

  /**
   * Middleware to validate the request body against the defined schema.
   */
  public async validateBody(ctx: Router.RouterContext, next: Koa.Next) {
    const fields = ctx.request.body as Optional<any, string> | undefined;

    if (!fields) {
      throw new SyClientError(HttpStatus.BAD_REQUEST, ResponseMessages.PAYLOAD_FAIL);
    }

    const { error } = await this.schema.validate(fields, { abortEarly: false });

    if (error) {
      const errorDetails = `Fields: ${fields}`;
      throw new SyClientError(HttpStatus.BAD_REQUEST, error.details[0].message, errorDetails);
    }

    await next();
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
}
