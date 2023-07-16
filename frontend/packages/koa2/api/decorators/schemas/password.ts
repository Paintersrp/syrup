import Joi from 'joi';
import { SchemaProps } from './types';

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 100;
const PASSWORD_MAX_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]*$/;

/**
 * Decorator for validating a password property.
 * @param props Optional schema properties for password validation.
 * @returns A property decorator function.
 */
export function PasswordSchema(props?: SchemaProps): PropertyDecorator {
  const { min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH, trim = false } = props || {};

  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (!propertyType || propertyType.name !== 'String') {
      throw new Error(`@PasswordSchema decorator can only be applied to string properties.`);
    }

    const schema = Joi.string()
      .min(min)
      .max(max)
      .trim(trim)
      .pattern(PASSWORD_MAX_REGEX)
      .messages({
        'string.base': `${propName} must be a string`,
        'string.empty': `${propName} cannot be empty`,
        'string.min': `${propName} should have a minimum length of ${min} characters`,
        'string.max': `${propName} should have a maximum length of ${max} characters`,
        'string.pattern.base': `${propName} should contain at least one uppercase letter, one lowercase letter, and one digit`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema,
    });
  };
}
