import Joi from 'joi';

/**
 * Decorator for validating a boolean property.
 * @returns A property decorator function.
 */
export function BooleanSchema(): PropertyDecorator {
  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (propertyType !== Boolean) {
      throw new Error(`@BooleanSchema decorator can only be applied to boolean properties.`);
    }

    const schema = Joi.boolean().messages({
      'boolean.base': `${propName} must be a boolean`,
      'any.required': `${propName} is required.`,
    });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
