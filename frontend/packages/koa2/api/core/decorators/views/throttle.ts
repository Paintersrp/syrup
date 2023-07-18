export function Throttle(limit, duration) {
  const rateLimiter = new Map();
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (ctx, next) {
      const clientIP = ctx.ip;
      if (!rateLimiter.has(clientIP)) {
        rateLimiter.set(clientIP, { count: 1, timestamp: Date.now() });
      } else {
        const client = rateLimiter.get(clientIP);
        if (client.count >= limit) {
          ctx.status = 429;
          ctx.body = { error: 'Too Many Requests' };
          return;
        }
        client.count += 1;
      }
      setTimeout(() => {
        rateLimiter.delete(clientIP);
      }, duration);
      return originalMethod.call(this, ctx, next);
    };
    return descriptor;
  };
}
