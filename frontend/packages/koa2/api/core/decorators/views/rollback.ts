import { Transaction } from 'sequelize';
import { sequelize } from '../../../settings';

/**
 * Decorator function that wraps a method with a rollback mechanism using transactions.
 */
export function Rollback(_: any, __: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    const transaction = (await sequelize.transaction()) as Transaction;

    try {
      const result = await originalMethod.call(this, ...args, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  return descriptor;
}
