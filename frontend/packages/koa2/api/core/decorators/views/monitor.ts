import { Context, Next } from 'koa';
import { logger } from '../../../settings';

/**
 * TODO:
 * Metrics Model to Save Method/Metrics
 */

/**
 * Decorator function to log the metrics of a method
 */
export function Monitor(_: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (ctx: Context, next: Next) {
    const startTime = Date.now();

    await originalMethod.call(this, ctx, next);

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    reportMetrics(key, executionTime);
  };
  return descriptor;
}

export function reportMetrics(key: string, executionTime: number) {
  logger.info({ key, executionTime });
}
