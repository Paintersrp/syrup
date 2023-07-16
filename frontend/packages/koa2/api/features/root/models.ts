import { ObjectSchema } from 'joi';
import { Model, Table } from 'sequelize-typescript';

import { NotFoundError } from '../../lib';
import { Filter, UpdateInput } from './types';

// Bulk deletes? Bulk Edits? Find by Id Array?

@Table
/**
 * Base model class representing a root model with common utility methods.
 */
export class Root extends Model {
  /**
   * A descriptive name for the model.
   */
  static verbose = 'Root';

  /**
   * Internal function for input validation.
   * @param input - The input data to validate.
   */
  static validateFn: ObjectSchema<any>;
  static viewSchema: ObjectSchema<any>;

  /**
   * Get the table name associated with the model.
   * @returns The table name.
   */
  static getTableName(): string {
    return this.tableName;
  }

  /**
   * Get the verbose name of the model.
   * @returns The verbose name.
   */
  static getVerbose(): string {
    return this.verbose;
  }

  /**
   * Paginates a list of objects based on the given page and page size.
   * @param objects - The list of objects to paginate.
   * @param page - The current page number.
   * @param pageSize - The number of objects to include per page.
   * @returns The paginated list of objects.
   */
  static paginateObjects<T>(objects: T[], page: number, pageSize: number): T[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return objects.slice(startIndex, endIndex);
  }

  /**
   * Filters a list of objects based on the given filters.
   * @param objects - The list of objects to filter.
   * @param filters - The filters to apply to the objects.
   * @returns The filtered list of objects.
   */
  static filterObjects<T>(objects: T[], filters: Filter<T>): T[] {
    const filterKeys = Object.keys(filters);
    return objects.filter((result) =>
      filterKeys.every((key) => (result as any)[key] === filters[key])
    );
  }

  /**
   * Finds a model instance by ID.
   * @param id - The ID of the model instance to find.
   * @returns The found model instance.
   * @throws NotFoundError if the model instance is not found.
   */
  static async findById(id: string): Promise<Root> {
    const obj = await this.findByPk(id);

    if (obj) {
      return obj;
    } else {
      throw new NotFoundError(this.verbose);
    }
  }

  /**
   * Deletes a model instance by ID.
   * @param id - The ID of the model instance to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  static async deleteById(id: string): Promise<boolean> {
    const obj = await this.findById(id);
    await obj.destroy();

    return true;
  }

  /**
   * Updates a model instance by ID with the provided input.
   * @param id - The ID of the model instance to update.
   * @param input - The input data to update the model instance.
   * @returns The updated model instance.
   */
  static async updateById(id: string, input: UpdateInput): Promise<Root> {
    const obj: any = await this.findById(id);

    for (const field in input) {
      if (obj[field] !== undefined) {
        obj[field] = input[field];
      }
    }
    await obj.save();

    return obj;
  }

  /**
   * Validates the input data using the registered validation function.
   * @param input - The input data to validate.
   * @throws Error if no validation function is set on the model.
   */
  static async validateInput(input: UpdateInput): Promise<void> {
    if (this.validateFn) {
      this.validateFn.validate(input);
    } else {
      throw new Error(`No validation function set on model: ${this.verbose}`);
    }
  }
}
