import Koa from 'koa';

import { User } from '../apps/user';

export const loggingMiddleware: Koa.Middleware = async (ctx, next) => {
  const user: User | string = ctx.state.user ?? 'Anonymous';

  const logMessage = `Received request - Method: ${ctx.method}, Path: ${ctx.path}, User: ${user}`;
  console.log(logMessage);

  await next();
};
