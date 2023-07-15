/**
 * Koa Apollo Server
 *
 * This file sets up a Koa server with Apollo Server to handle GraphQL requests.
 * It merges the type definitions and resolvers from different feature modules
 * and initializes the server object with the merged schema and resolvers.
 *
 * Features:
 *  - User: Handles user-related type definitions and resolvers.
 *  - Meta: Handles meta-related type definitions and resolvers.
 *  - Root: Handles root-level type definitions and resolvers.
 *
 * Middlewares:
 *  - jwtMiddleware: Middleware for JWT authentication.
 *  - errorMiddleware: Middleware for error handling.
 *
 * The server is started by calling the startServer function, which initializes
 * the Apollo Server, applies the Koa middleware, syncs the Sequelize database,
 * and starts the Koa server to listen for incoming requests.
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

import { sequelize } from './lib';
import {
  errorMiddleware,
  jwtMiddleware,
  loggingMiddleware,
  notFoundMiddleware,
} from './middleware';

import { UserViews } from './features/user';

/***
 * Initate Koa Server with Middlewares
 */
const app = new Koa();
const PORT = 4000;

app.use(bodyParser());
app.use(compress());
app.use(jwtMiddleware);
app.use(loggingMiddleware);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

new UserViews(app);

async function startServer() {
  await sequelize
    .sync()
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

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
