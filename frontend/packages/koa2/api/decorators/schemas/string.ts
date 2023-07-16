import Joi from 'joi';
import { SchemaProps } from './types';

const STRING_MIN_LENGTH = 2;
const STRING_MAX_LENGTH = 50;

/**
 * Decorator for validating a string property.
 * @param props Optional schema properties for string validation.
 * @returns A property decorator function.
 */
export function StringSchema(props?: SchemaProps): PropertyDecorator {
  const { min = STRING_MIN_LENGTH, max = STRING_MAX_LENGTH, trim = true } = props || {};

  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!propertyType || propertyType.name !== 'String') {
      throw new Error(`@StringSchema decorator can only be applied to string properties.`);
    }

    const schema = Joi.string()
      .min(min)
      .max(max)
      .trim(trim)
      .messages({
        'string.base': `${propName} must be a string`,
        'string.empty': `${propName} cannot be empty`,
        'string.min': `${propName} should have a minimum length of ${min} characters`,
        'string.max': `${propName} should have a maximum length of ${max} characters`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
