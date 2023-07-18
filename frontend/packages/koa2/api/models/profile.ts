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

export class Profile extends SyModel<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
  declare userId: ForeignKey<User['id']>;

  @Field({
    type: DataTypes.STRING(50),
    verbose: 'Email Address',
  })
  declare email: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'First Name',
  })
  declare firstName: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(40),
    verbose: 'Last Name',
  })
  declare lastName: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(1024),
    verbose: 'Biography',
  })
  declare bio: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(50),
    verbose: 'City',
  })
  declare city: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Country',
  })
  declare country: CreationOptional<string>;

  @Field({
    type: DataTypes.NUMBER,
    verbose: 'Phone Number',
  })
  declare phone: CreationOptional<number>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Facebook',
  })
  declare facebook: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Instagram',
  })
  declare instagram: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Threads',
  })
  declare threads: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Twitter',
  })
  declare twitter: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'LinkedIn',
  })
  declare linkedIn: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'Github',
  })
  declare github: CreationOptional<string>;

  @Field({
    type: DataTypes.STRING(30),
    verbose: 'YouTube',
  })
  declare youtube: CreationOptional<string>;

  toJSON(): any {
    return {
      ...super.toJSON(),
      fullName: `${this.firstName} ${this.lastName}`,
    };
  }
}

Profile.init(
  {
    ...SyModel.metaFields,
    ...Profile.fields,
  },
  {
    tableName: 'profile',
    sequelize,
  }
);

// console.log(Profile.metadata);
// console.log(Profile.getKeys());
