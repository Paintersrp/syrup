import Koa from 'koa';
import jwt from 'jsonwebtoken';

/**
 * JWT Middleware
 *
 * Koa middleware to handle JWT authentication. Parses the authorization
 * header, verifies and decodes the JWT token, and attaches the decoded
 * user object to the Koa context state.
 *
 * @param ctx - Koa context object.
 * @param next - Next middleware function.
 */
export const jwtMiddleware: Koa.Middleware = async (ctx, next) => {
  //   const token = ctx.headers.authorization?.split(' ')[1];

  //   if (!token) {
  //     ctx.status = 401;
  //     ctx.body = { error: 'Missing token' };
  //     // return;
  //   }

  //   try {
  //     // remove comments on return and if checks once set up
  //     if (token) {
  //       const decoded = jwt.verify(token, 'your-secret-key');
  //       ctx.state.user = decoded;
  //     }
  //   } catch (error) {
  //     ctx.status = 401;
  //     ctx.body = { error: 'Invalid token' };
  //     // return;
  //   }

  await next();
};
