import { Model, ModelAttributeColumnOptions } from 'sequelize';

export type UpdateInput = {
  [key: string]: any;
};

export type Filter<T> = {
  [key: string]: T;
};

/**
 * Custom attribute type for storing metadata including the verbose name.
 */
export interface CustomModelAttributeColumnOptions<T extends Model<T>>
  extends ModelAttributeColumnOptions<T> {
  verbose?: string;
}

/**
 * Type definition for the custom attributes object.
 */
export type CustomAttributes = Record<string, CustomModelAttributeColumnOptions<Model<any, any>>>;
