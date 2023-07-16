import Joi from 'joi';

/**
 * Decorator for validating an object property.
 * @returns A property decorator function.
 */
export function ObjectSchema(): PropertyDecorator {
  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    if (propertyType !== Object) {
      throw new Error(`@ObjectSchema decorator can only be applied to object properties.`);
    }

    const schema = Joi.object().messages({
      'object.base': `${propName} must be an object`,
      'any.required': `${propName} is required.`,
    });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
