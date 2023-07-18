/**
 * Koa Server
 *
 * This file initializes and starts a Koa server with middlewares and views.
 * It establishes a connection to the database and handles starting the server.
 */

import Koa from 'koa';
import * as settings from './settings';

/***
 * Initiates the Koa server with middlewares and views.
 */
const PORT = 4000;
const app = new Koa();
app.use(settings.APP_MIDDLEWARES);

settings.APP_VIEWS.forEach((View) => {
  new View(app);
});

/***
 * Handles starting the server with feedback and initial messages.
 */
async function startServer() {
  await settings.sequelize
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
