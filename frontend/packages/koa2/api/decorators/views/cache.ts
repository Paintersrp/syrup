import { Context, Next } from 'koa';

/**
 * Caches the response of a method for a specified duration.
 * @param duration - The duration in milliseconds for which the response should be cached.
 * @returns The decorator function.
 */
export function Cache(duration: number) {
  const cache = new Map<string, any>();

  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (ctx: Context, next: Next) {
      const cacheKey = `${ctx.method}-${ctx.url}`;

      if (cache.has(cacheKey)) {
        const cachedResponse = cache.get(cacheKey);
        ctx.body = cachedResponse;
        return;
      }

      await originalMethod.call(this, ctx, next);
      cache.set(cacheKey, ctx.body);

      setTimeout(() => {
        cache.delete(cacheKey);
      }, duration);
    };

    return descriptor;
  };
}
