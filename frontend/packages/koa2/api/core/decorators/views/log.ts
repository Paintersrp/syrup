import { Context, Next } from 'koa';
import { Request } from '../../../models';

/**
 * Decorator function to log the request details to the database.
 */
export function Log(_: any, __: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (ctx: Context, next: Next) {
    const method = ctx.method;
    const endpoint = ctx.url;
    const headers = JSON.parse(JSON.stringify(ctx.headers));
    const payload = ctx.request.body as JSON;

    Request.create({
      method,
      endpoint,
      headers,
      payload,
    });

    return originalMethod.call(this, ctx, next);
  };

  return descriptor;
}
