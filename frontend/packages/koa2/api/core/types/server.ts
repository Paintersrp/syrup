import Koa, { DefaultContext, ParameterizedContext } from 'koa';
import compose from 'koa-compose';
import { Logger } from 'pino';
import { RouteConstructor } from '../../types';
import { SyCache } from '../SyCache';
import { SyDatabase } from '../SyDatabase';

/**
 * Interface for specifying resource thresholds used in health checks.
 */
export interface ServerResourceThresholds {
  /**
   * Threshold for memory usage, represented as a percentage (e.g., 0.1 for 10%).
   */
  memoryUsageThreshold: number;
  /**
   * Threshold for CPU usage, represented as a percentage (e.g., 0.8 for 80%).
   */
  cpuUsageThreshold: number;
  /**
   * Threshold for disk space availability, represented as a percentage (e.g., 0.8 for 80%).
   */
  diskSpaceThreshold: number;
}

/**
 * Interface for the options used to create an instance of `SyServer`.
 */
export interface SyServerOptions {
  /**
   * The Koa application instance.
   */
  app: Koa;
  /**
   * The port on which the server will listen.
   */
  port: number;
  /**
   * The logger instance used for logging server events and errors.
   */
  logger: Logger;
  /**
   * The cache instance used for caching data in the server.
   */
  cache: SyCache;
  /**
   * The SyDatabase instance for interacting with the database.
   */
  ORM: SyDatabase;
  /**
   * Optional resource thresholds used in health checks.
   */
  resourceThresholds?: ServerResourceThresholds;
  /**
   * Optional middleware to be applied to the Koa application.
   */
  middleware?: compose.ComposedMiddleware<ParameterizedContext<{}, DefaultContext, any>>;
  /**
   * Optional array of route constructors to initialize routes in the server.
   */
  routes?: RouteConstructor[];
  /**
   * Optional server version number for version control
   */
  version?: string;
}
