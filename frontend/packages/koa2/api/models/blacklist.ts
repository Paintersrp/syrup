import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';

import { Field } from '../core/decorators/models';
import { sequelize } from '../core/lib/sequelize';
import { SyModel } from '../core/SyModel';

import { User } from './user';

export class Blacklist extends SyModel<
  InferAttributes<Blacklist>,
  InferCreationAttributes<Blacklist>
> {
  declare userId: ForeignKey<User['id']>;

  @Field({ type: DataTypes.STRING(500), verbose: 'Blacklisted Token' })
  declare token: CreationOptional<string>;
}

Blacklist.init(
  {
    ...SyModel.metaFields,
    ...Blacklist.fields,
  },
  {
    tableName: 'blacklist',
    sequelize,
  }
);

// console.log(Profile.metadata);
// console.log(Profile.getKeys());
