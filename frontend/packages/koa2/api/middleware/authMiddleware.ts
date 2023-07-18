import Koa from 'koa';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'your_jwt_secret_key';

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const authHeader = ctx.request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      ctx.state.user = decodedToken;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = 'Invalid token';
    }
  } else {
    ctx.status = 401;
    ctx.body = 'Authorization header required';
  }
};
