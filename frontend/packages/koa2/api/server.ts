/**
 * Koa Server
 *
 * This file initializes and starts a Koa server with middlewares and views.
 * It establishes a connection to the database and handles starting the server.
 */

import Koa from 'koa';

import * as settings from './settings';
import { startServer } from './helpers/startServer';

const port = 4000; // use dotenv
const app = new Koa();

app.context.logger = settings.logger;
app.use(settings.APP_MIDDLEWARES);

settings.ROUTES.forEach((RouteSet) => {
  new RouteSet(app);
});

startServer(app, port, settings.logger, settings.cache);
