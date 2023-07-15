export function Monitor(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (ctx, next) {
    const startTime = Date.now();
    await originalMethod.call(this, ctx, next);
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    reportMetrics(key, executionTime);
  };
  return descriptor;
}

// Modular for scaling
export function reportMetrics(key: string, executionTime: number) {
  console.log(`Method ${key} executed in ${executionTime}ms`);
}
