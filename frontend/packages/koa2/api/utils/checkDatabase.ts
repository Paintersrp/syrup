import { sequelize } from '../settings';
import { waitAndRetry } from './waitAndRetry';

/**
 * Checks the database connection status.
 * @param options Optional parameters for configuring the database check.
 * @returns A promise that resolves to a boolean indicating the database health.
 */
export async function checkDatabase(options?: {
  retries?: number;
  retryDelay?: number;
}): Promise<boolean> {
  const maxRetries = options?.retries ?? 3;
  const retryDelay = options?.retryDelay ?? 1000;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      // Attempt to authenticate the Sequelize connection
      await sequelize.authenticate();

      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Error occurred during database connection check:', error);
      currentRetry++;

      if (currentRetry < maxRetries) {
        console.log(`Retrying database connection in ${retryDelay}ms...`);
        await waitAndRetry(retryDelay);
      }
    }
  }

  console.error('Max retry attempts reached. Database connection failed.');
  return false;
}
