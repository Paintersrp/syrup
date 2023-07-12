import Koa from 'koa';

/**
 * Error Middleware
 *
 * Koa middleware to handle errors. Catches any errors that occur during
 * request processing and sends an appropriate error response.
 *
 * @param ctx - Koa context object.
 * @param next - Next middleware function.
 */
export const errorMiddleware: Koa.Middleware = async (ctx, next) => {
  await next();

  if (ctx.response.status === 404) {
    const errorResponse = {
      error: {
        message: `The requested resource '${ctx.path}' was not found.`,
        description: `No view function could be found for the URL '${ctx.path}'.`,
        instructions:
          'This error may have occurred due to a temporary outage or maintenance. Please check back later or contact our support team if the issue persists.',
        thanks: 'Thank you for using Syrup!',
      },
    };

    ctx.status = 404;
    ctx.body = errorResponse;
  }
};
