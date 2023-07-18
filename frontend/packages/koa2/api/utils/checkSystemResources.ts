import os from 'os';

/**
 * Represents the response object containing system resources availability information.
 */
export type ResourcesResponse = {
  status: boolean;
  memoryUsage?: any;
  diskSpaceAvailable?: any;
  cpuUsage?: any;
};

/**
 * Checks the availability of system resources such as memory, disk space, and CPU usage.
 * @param {number} [diskThreshold = 0.1] - The threshold value (between 0 and 1) for disk
 * space availability.
 * @param {number} [memoryThreshold=0.8] - The threshold value (between 0 and 1) for memory usage.
 * @param {number} [cpuThreshold=0.8] - The threshold value (between 0 and 1) for CPU usage.
 * @returns An object containing the system resources availability information.
 */
export function checkSystemResources(
  diskThreshold: number = 0.1,
  memoryThreshold: number = 0.8,
  cpuThreshold: number = 0.8
): ResourcesResponse {
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const cpuCount = os.cpus().length;
    const loadAverage = os.loadavg()[0];

    const memoryUsage = 1 - freeMemory / totalMemory;
    const diskSpaceAvailable = freeMemory / totalMemory;
    const cpuUsage = loadAverage / cpuCount;

    const resourceResponse = (status: boolean): ResourcesResponse => {
      return {
        status: status,
        memoryUsage,
        diskSpaceAvailable,
        cpuUsage,
      };
    };

    if (memoryUsage > memoryThreshold) {
      return resourceResponse(false);
    }

    if (cpuUsage > cpuThreshold) {
      return resourceResponse(false);
    }

    if (diskSpaceAvailable < diskThreshold) {
      return resourceResponse(false);
    }

    return resourceResponse(true);
  } catch (error) {
    console.error('Error occurred during system resources availability check:', error);
    return {
      status: false,
    };
  }
}
