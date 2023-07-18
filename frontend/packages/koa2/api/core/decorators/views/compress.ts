export function Compress(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (ctx, next) {
    await originalMethod.call(this, ctx, next);
    // const originalBody = ctx.body;

    ctx.compress = true;

    // const originalSize = Buffer.byteLength(JSON.stringify(originalBody));
    // const compressedSize = Buffer.byteLength(JSON.stringify(ctx.body));

    // console.log(
    //   `Response compressed: Original size: ${originalSize} bytes, Compressed size: ${compressedSize} bytes`
    // );
  };
  return descriptor;
}
