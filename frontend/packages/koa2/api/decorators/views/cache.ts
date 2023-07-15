// How to Persist?
export function Cache(duration) {
  const cache = new Map();
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (ctx, next) {
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
