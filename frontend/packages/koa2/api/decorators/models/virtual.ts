import { Column, DataType } from 'sequelize-typescript';
import { Root } from '../../features/root';

/**
 * Decorator to define a virtual column in a Sequelize model.
 * @param target - The target class.
 * @param propertyName - The name of the virtual property.
 */
export function Virtual(target: Root, propertyName: string) {
  Column({
    type: DataType.VIRTUAL,
  })(target, propertyName);
}
