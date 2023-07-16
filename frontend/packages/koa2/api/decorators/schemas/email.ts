import Joi from 'joi';
import { SchemaProps } from './types';

const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 255;

/**
 * Decorator for validating an email property.
 * @param props Optional schema properties for email validation.
 * @returns A property decorator function.
 */
export function EmailSchema(props?: SchemaProps): PropertyDecorator {
  const { min = EMAIL_MIN_LENGTH, max = EMAIL_MAX_LENGTH, trim = true } = props || {};

  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!propertyType || propertyType.name !== 'String') {
      throw new Error(`@EmailSchema decorator can only be applied to string properties.`);
    }

    const schema = Joi.string()
      .email({ tlds: { allow: false } })
      .min(min)
      .max(max)
      .trim(trim)
      .messages({
        'string.base': `${propName} must be a string`,
        'string.empty': `${propName} cannot be empty`,
        'string.email': `${propName} must be a valid email address`,
        'string.min': `${propName} should have a minimum length of ${min} characters`,
        'string.max': `${propName} should have a maximum length of ${max} characters`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema,
    });
  };
}
