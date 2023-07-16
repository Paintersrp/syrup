import Joi from 'joi';
import { SchemaProps } from './types';

const URL_MIN = 0;
const URL_MAX = Number.MAX_SAFE_INTEGER;

/**
 * Decorator for validating a URL property.
 * @param props Optional schema properties for URL validation.
 * @returns A property decorator function.
 */
export function URLSchema(props?: SchemaProps): PropertyDecorator {
  const { min = URL_MIN, max = URL_MAX, trim = true } = props || {};

  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString().replace(/^"|"$/g, '');
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!propertyType || propertyType.name !== 'String') {
      throw new Error(`@URLSchema decorator can only be applied to string properties.`);
    }

    const schema = Joi.string()
      .uri()
      .min(min)
      .max(max)
      .trim(trim)
      .messages({
        'string.base': `${propName} must be a string`,
        'string.empty': `${propName} cannot be empty`,
        'string.uri': `${propName} must be a valid URL`,
        'string.min': `${propName} should have a minimum length of ${min} characters`,
        'string.max': `${propName} should have a maximum length of ${max} characters`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema,
    });
  };
}
