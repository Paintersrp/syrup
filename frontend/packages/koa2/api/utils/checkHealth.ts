import { checkDatabase } from './checkDatabase';
import { checkFrontend } from './checkFrontend';
import { checkSystemResources, ResourcesResponse } from './checkSystemResources';

/**
 * Checks the overall health status of the application by performing various health checks.
 * @returns A promise that resolves an object with the health status and system resources.
 */
export async function checkHealth(): Promise<{
  status: boolean;
  resources?: ResourcesResponse;
}> {
  try {
    const isDatabaseConnected = await checkDatabase();
    const isExternalServiceHealthy = await checkFrontend();
    const systemResources = checkSystemResources();

    return {
      status: isDatabaseConnected && isExternalServiceHealthy && systemResources.status,
      resources: systemResources,
    };
  } catch (error) {
    console.error('Error occurred during health check:', error);
    return {
      status: false,
      resources: undefined,
    };
  }
}
