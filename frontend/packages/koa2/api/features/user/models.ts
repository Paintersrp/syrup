import Joi from 'joi';
import { Column, Table } from 'sequelize-typescript';

import { Virtual } from '../../decorators/models';
import { StringSchema } from '../../decorators/schemas';

import { sequelize } from '../../lib';
import { Root } from '../root/models';

import { UserSchema } from './schema';

@Table
export class User extends Root {
  static verbose = 'User';
  static validateFn = UserSchema;
  static viewSchema = Joi.object({});

  @Column
  @StringSchema({ min: 2, max: 50 })
  firstName!: string;

  @Column
  @StringSchema({ min: 1, max: 10 })
  lastName?: string;

  @Virtual
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

sequelize.addModels([User]);
