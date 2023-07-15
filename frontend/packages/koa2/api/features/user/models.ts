import Joi from 'joi';
import { Column, DataType, Table } from 'sequelize-typescript';

import { sequelize } from '../../lib';
import { Root } from '../root/models';

export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

@Table
export class User extends Root {
  static verbose = 'User';
  static validateFn = userSchema;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  // Custom Virtual Decorator
  @Column(DataType.VIRTUAL)
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

sequelize.addModels([User]);
