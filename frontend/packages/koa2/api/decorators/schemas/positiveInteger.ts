import Joi from 'joi';
import { SchemaProps } from './types';

const POSITIVE_INT_MIN = 0;
const POSITIVE_INT_MAX = Number.MAX_SAFE_INTEGER;

/**
 * Decorator for validating a positive integer property.
 * @param props Optional schema properties for positive integer validation.
 * @returns A property decorator function.
 */
export function PositiveIntSchema(props?: SchemaProps): PropertyDecorator {
  const { min = POSITIVE_INT_MIN, max = POSITIVE_INT_MAX } = props || {};

  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!propertyType || propertyType.name !== 'Number') {
      throw new Error(`@PositiveIntSchema decorator can only be applied to number properties.`);
    }

    const schema = Joi.number()
      .integer()
      .positive()
      .min(min)
      .max(max)
      .messages({
        'number.base': `${propName} must be a number`,
        'number.integer': `${propName} must be an integer`,
        'number.positive': `${propName} must be a positive number`,
        'number.min': `${propName} should be greater than or equal to ${min}`,
        'number.max': `${propName} should be less than or equal to ${max}`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema,
    });
  };
}
