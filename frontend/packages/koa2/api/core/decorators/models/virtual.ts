import { DataTypes } from 'sequelize';

/**
 * Decorator to define a virtual column in a Sequelize model.
 * @param target - The target class.
 * @param propertyName - The name of the virtual property.
 */
export function Virtual(target: any, propertyName: string) {
  if (!target.constructor.fields) {
    target.constructor.fields = {};
  }

  target.constructor.fields[propertyName] = { type: DataTypes.VIRTUAL };
}
