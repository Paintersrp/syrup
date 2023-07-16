import Joi from 'joi';

/**
 * Decorator for validating an enum property.
 * @param values The valid values of the enum.
 * @returns A property decorator function.
 */
export function EnumSchema<T extends string>(values: T[]): PropertyDecorator {
  return function (target: any, propertyName: string | symbol) {
    const propName = propertyName.toString();
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);

    const isValidValue = (value: any): value is T => values.includes(value);

    if (!isValidValue(propertyType)) {
      throw new Error(
        `@EnumSchema decorator can only be applied to properties with values from the provided enum.`
      );
    }

    const schema = Joi.string()
      .valid(...values)
      .messages({
        'any.only': `${propName} must have a value from the provided enum: ${values.join(', ')}`,
        'any.required': `${propName} is required.`,
      });

    target.constructor.viewSchema = target.constructor.viewSchema.keys({
      [propName]: schema.required(),
    });
  };
}
