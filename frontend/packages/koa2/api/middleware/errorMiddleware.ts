import Koa from 'koa';

export const errorMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      ctx.status = 400;
      ctx.body = {
        error: 'Validation Error',
        details: error.errors,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error',
      };
      console.error(error);
    }
  }
};
