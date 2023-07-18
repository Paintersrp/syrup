/**
 * Koa Server
 *
 * This file sets up a Koa server to handle REST API requests using Sequelize ORM.
 * It initializes the server object, applies middlewares, and registers API views
 * and controllers from different feature modules.
 *
 * Features:
 *  - User: Handles user-related API views and controllers.
 *  - Meta: Handles meta-related API views and controllers.
 *  - Root: Handles root-level API views and controllers.
 *
 * Middlewares:
 *  - bodyParser: Middleware for parsing request bodies.
 *  - compress: Middleware for compressing response bodies.
 *  - jwtMiddleware: Middleware for JWT authentication.
 *  - loggingMiddleware: Middleware for logging request details.
 *  - errorMiddleware: Middleware for error handling.
 *  - notFoundMiddleware: Middleware for handling 404 (not found) errors.
 *
 * The server is started by calling the startServer function, which initializes
 * the Koa server, syncs the Sequelize database, and starts the server to listen
 * for incoming requests.
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

import {
  authMiddleware,
  errorMiddleware,
  jwtMiddleware,
  loggingMiddleware,
  notFoundMiddleware,
} from './middleware';

import { sequelize } from './core/lib/sequelize';
import { BlacklistViews, ProfileViews, UserViews } from './views';
import { doStuffWithUser } from './models/user';
import { APP_VIEWS } from './settings';

/***
 * Initate Koa Server with Middlewares
 */
const app = new Koa();
const PORT = 4000;

/***
 * Initate Middlewares
 */
app.use(bodyParser());
app.use(compress());
app.use(jwtMiddleware);
app.use(loggingMiddleware);
app.use(errorMiddleware);
app.use(notFoundMiddleware);
// app.use(authMiddleware);

/***
 * Initate API Views on Koa application
 */

for (const View of APP_VIEWS) {
  new View(app);
}

/***
 * Handles starting the server with feedback and initial messages
 */
async function startServer() {
  await sequelize
    .sync()
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

  await doStuffWithUser();

  app.listen({ port: PORT }, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

/***
 * Call to start the server and catch/handle errors
 */
startServer().catch((err) => {
  console.error('Error starting server:', err);
});
