import Koa from 'koa';
import { User } from '../models';

/**
 * Koa middleware to handle logging requests. Logs the method, path, and user (role).
 *
 * @param ctx - Koa context object.
 * @param next - Next middleware function.
 */
export const loggingMiddleware: Koa.Middleware = async (ctx, next) => {
  const user: User | string = `${ctx.state.user} (${ctx.state.role})` ?? 'Anonymous';

  const logMessage = `Received request - Method: ${ctx.method}, Path: ${ctx.path}, User: ${user}`;
  console.log(logMessage);

  await next();
};
