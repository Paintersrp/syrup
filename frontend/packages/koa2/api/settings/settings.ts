import * as Middleware from '../middleware';
import * as Views from '../views';

/**
 * Collection of views handling user-related API views and controllers.
 */
export const APP_VIEWS = [
  // Add Views Here
  Views.UserViews,
  Views.ProfileViews,
  Views.BlacklistViews,
  Views.CacheViews,
  Views.RequestViews,
];

/**
 * Collection of middlewares for the application.
 */
export const MIDDLEWARES = [
  // Add Middlewares Here
  Middleware.helmet(),
  // Middleware.cors(),
  Middleware.bodyParser(),
  Middleware.compress(),
  Middleware.responseTime(),
  Middleware.rateLimitMiddleware,
  Middleware.jwtMiddleware,
  Middleware.loggingMiddleware,
  Middleware.healthMiddleware,
  Middleware.errorMiddleware,
  Middleware.notFoundMiddleware,
  Middleware.serve('public'), // constant for static files?
];

/**
 * Composed middleware function using the middlewares defined in `MIDDLEWARES`.
 */
export const APP_MIDDLEWARES = Middleware.compose(MIDDLEWARES);

/**
 * Secret key for JWT authentication.
 */
export const JWT_SECRET = 'your_jwt_secret_key';
