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
    ctx.status = error.status || 500;
    const errorName = error.name || 'InternalServerError';
    const errorMessage = error.message || 'An unexpected error occurred';
    const errorDetails = error.errors || {};

    ctx.body = {
      error: errorName,
      message: errorMessage,
      details: errorDetails,
    };

    ctx.logger.error({ error, event: 'error', message: errorMessage });

    if (ctx.status === 500) {
      ctx.logger.error({
        message: 'Alert: Critical system error occurred',
        errorDetails,
        stack: error.stack,
      });
    }
  }
};
