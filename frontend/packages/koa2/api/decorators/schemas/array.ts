import Joi from 'joi';
import { SchemaProps } from './types';

/**
 * Decorator for validating an array property.
 * @param itemSchema The Joi schema to validate each item in the array.
 * @param props Optional schema properties for array validation (e.g., min, max).
 * @returns A property decorator function.
 */
export function ArraySchema<T>(itemSchema: Joi.Schema, props?: SchemaProps): PropertyDecorator {
  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!Array.isArray(propertyType)) {
      throw new Error(`@ArraySchema decorator can only be applied to array properties.`);
    }

    const { min = 0, max = Infinity } = props || {};

    const schema = Joi.array()
      .items(itemSchema)
      .min(min)
      .max(max)
      .messages({
        'array.base': `${propName} must be an array`,
        'array.min': `${propName} should have a minimum length of ${min} items`,
        'array.max': `${propName} should have a maximum length of ${max} items`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
