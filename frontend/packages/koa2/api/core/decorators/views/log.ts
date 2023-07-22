import { Context, Next } from 'koa';
import { User } from '../../../models';
import { server } from '../../../server';

/**
 * Decorator function to log the request details to the database.
 */
export function Log(_: any, __: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (ctx: Context, next: Next) {
    const method = ctx.method;
    const endpoint = ctx.url;
    const headers = JSON.stringify(ctx.headers);
    const payload = JSON.stringify(ctx.request.body);
    const user: User | string = `${ctx.state.user} (${ctx.state.role})` ?? 'Anonymous';

    server.logger.info({ method, endpoint, payload, headers, user });

    return originalMethod.call(this, ctx, next);
  };

  return descriptor;
}
