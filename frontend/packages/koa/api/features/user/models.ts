import { DataTypes } from 'sequelize';

import { sequelize } from '../../lib';
import { Root } from '../root/models';
import { validateUserInput } from './validate';

export class User extends Root {
  static verbose = 'User';
  static validateFn = validateUserInput;
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
