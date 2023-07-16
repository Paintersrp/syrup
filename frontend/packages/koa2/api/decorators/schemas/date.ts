import Joi from 'joi';
import { SchemaProps } from './types';

/**
 * Decorator for validating a date property.
 * @param props Optional schema properties for date validation.
 * @returns A property decorator function.
 */
export function DateSchema(props?: SchemaProps): PropertyDecorator {
  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (propertyType !== Date) {
      throw new Error(`@DateSchema decorator can only be applied to Date properties.`);
    }

    const schema = Joi.date()
      .iso()
      .messages({
        'date.base': `${propName} must be a valid date`,
        'date.iso': `${propName} must be in ISO 8601 format`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
