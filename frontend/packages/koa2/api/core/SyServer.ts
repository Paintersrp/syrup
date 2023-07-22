import Koa from 'koa';
import { Server } from 'http';
import { Logger } from 'pino';

import { SyCache } from '../core/SyCache';
import { SyDatabase } from './SyDatabase';
import { SyHealthMixin } from './mixins/server';

import { ServerResourceThresholds, SyServerOptions } from './types/server';

/**
 * The SyServer class represents a Koa-based server with support for health checks and resource monitoring.
 * It provides functionality to handle server startup, graceful shutdown, and health checks for various components.
 */
export class SyServer {
  app: Koa;
  port: number;
  logger: Logger;
  cache: SyCache;
  ORM: SyDatabase;
  resourceThresholds: ServerResourceThresholds;
  server?: Server;
  healthCheck: SyHealthMixin;
  version?: string;

  /**
   * Creates a new instance of SyServer with the provided options.
   * @param {SyServerOptions} options - The options to configure the server.
   */
  constructor({
    app,
    port,
    logger,
    cache,
    ORM,
    resourceThresholds,
    middleware,
    routes,
    version,
  }: SyServerOptions) {
    this.port = port;
    this.logger = logger;
    this.cache = cache;
    this.ORM = ORM;
    this.version = version;

    app.context.logger = this.logger;

    this.resourceThresholds = {
      memoryUsageThreshold: resourceThresholds?.memoryUsageThreshold || 0.1,
      cpuUsageThreshold: resourceThresholds?.cpuUsageThreshold || 0.8,
      diskSpaceThreshold: resourceThresholds?.diskSpaceThreshold || 0.8,
    };

    if (middleware) {
      app.use(middleware);
    }

    if (routes) {
      routes.forEach((RouteSet) => {
        new RouteSet(app);
      });
    }

    this.app = app;
    this.healthCheck = new SyHealthMixin(this);

    this.initEventHandlers();
  }

  protected initEventHandlers() {
    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      this.logger.error('Uncaught Exception thrown:', error);
      process.exit(1);
    });

    process.on('SIGTERM', async () => {
      await this.gracefulShutdown();
    });

    process.on('SIGINT', async () => {
      await this.gracefulShutdown();
    });
  }

  /**
   * Starts the server by initializing the database, cache, and routes, and then listening on the specified port.
   */
  public async start() {
    try {
      await this.ORM.startDatabase();
      await this.cache.start();

      this.server = this.app.listen(this.port, () => {
        this.logger.info(`Server running on http://localhost:${this.port}`);
      });
    } catch (error) {
      this.logger.error('Error starting server:', error);
      process.exit(1);
    }
  }

  /**
   * Performs a graceful shutdown of the server by closing the cache and server connections.
   */
  private async gracefulShutdown() {
    this.logger.info('Server is shutting down...');
    await this.cache.close();

    this.server?.close((error) => {
      if (error) {
        this.logger.error('Error while closing the server:', error);
        process.exit(1);
      } else {
        this.logger.info('Graceful shutdown complete.');
        process.exit(1);
      }
    });
  }
}
