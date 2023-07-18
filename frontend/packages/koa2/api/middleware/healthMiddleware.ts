import Koa from 'koa';
import { checkHealth } from '../utils';

/**
 * Koa middleware to handle checking the application's health.
 *
 * @param ctx - Koa context object.
 * @param next - Next middleware function.
 */
export const healthMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.path === '/health') {
    const health = await checkHealth();

    if (health.status) {
      ctx.status = 200;
      ctx.body = {
        server: health.resources?.status === true ? 'Server is healthy' : 'Server is unhealthy',
        serverMemoryUsage: health.resources?.memoryUsage,
        serverDiskSpaceAvailable: health.resources?.diskSpaceAvailable,
        serverCpuUsage: health.resources?.cpuUsage,
        database: 'Database is healthy',
        frontend: 'Frontend is healthy',
      };
    } else {
      ctx.status = 500;
      ctx.body = 'Server is not healthy';
    }
  } else {
    await next();
  }
};
