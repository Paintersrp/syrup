import Koa from 'koa';

/**
 * Koa middleware to handle errors. Catches any errors that occur during
 * request processing and sends an appropriate error response.
 *
 * @param ctx - Koa context object.
 * @param next - Next middleware function.
 */
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
