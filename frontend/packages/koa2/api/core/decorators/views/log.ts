export function Log(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (ctx, next) {
    console.log('Received request:');
    console.log(`Method: ${ctx.method}`);
    console.log(`URL: ${ctx.url}`);
    console.log('Headers:', ctx.headers);
    console.log('Payload:', ctx.request.body);
    return originalMethod.call(this, ctx, next);
  };
  return descriptor;
}
