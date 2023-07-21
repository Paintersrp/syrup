import { Server } from 'http';
import { Logger } from 'pino';
import { SyCache } from '../core/SyCache';

export async function gracefulShutdown(cache: SyCache, logger: Logger, server: Server) {
  logger.info('Server is shutting down...');
  await cache.close();

  server.close((err) => {
    if (err) {
      logger.error('Error while closing the server:', err);
      process.exit(1);
    } else {
      logger.info('Graceful shutdown complete.');
      process.exit(1);
    }
  });
}
