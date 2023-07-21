import Koa from 'koa';
import { Logger } from 'pino';

import { SyCache } from '../core/SyCache';
import { gracefulShutdown } from './gracefulShutdown';
import { startDatabase } from './startDatabase';

/***
 * Handles starting the server with feedback and initial messages.
 */
export function startServer(app: Koa, port: number, logger: Logger, cache: SyCache) {
  try {
    startDatabase();

    const server = app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });

    app.use(async (ctx, next) => {
      if (ctx.path === '/shutdown') {
        await gracefulShutdown(cache, logger, server);
        ctx.body = 'Server shutting down...';
      } else {
        await next();
      }
    });

    process.on('SIGTERM', async () => {
      await gracefulShutdown(cache, logger, server);
    });

    process.on('SIGINT', async () => {
      await gracefulShutdown(cache, logger, server);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
  }
}
