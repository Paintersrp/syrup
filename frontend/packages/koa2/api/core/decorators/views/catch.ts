export function Catch(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (ctx, next) {
    try {
      await originalMethod.call(this, ctx, next);
    } catch (error) {
      console.error('Error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  };
  return descriptor;
}
