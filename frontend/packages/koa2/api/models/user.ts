import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';
import bcrypt from 'bcrypt';

import { Field } from '../core/decorators/models';
import { sequelize } from '../core/lib/sequelize';
import { SyModel } from '../core/SyModel';

import { Profile } from './profile';

export enum UserRoleEnum {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export class User extends SyModel<
  InferAttributes<User, { omit: 'profile' }>,
  InferCreationAttributes<User, { omit: 'profile' }>
> {
  @Field({
    type: DataTypes.STRING(40),
    allowNull: false,
    verbose: 'Username',
  })
  declare username: string;

  @Field({
    type: DataTypes.STRING(500),
    allowNull: false,
    verbose: 'Password',
  })
  declare password: string;

  @Field({
    type: DataTypes.STRING(500),
    verbose: 'Salt',
  })
  declare salt?: string;

  @Field({
    type: DataTypes.STRING(500),
    verbose: 'Refresh Token',
  })
  declare refreshToken?: string;

  @Field({
    type: DataTypes.ENUM(...Object.values(UserRoleEnum)),
    allowNull: false,
    verbose: 'User Role',
    defaultValue: UserRoleEnum.USER,
  })
  declare role?: UserRoleEnum;

  @Field({
    type: DataTypes.ENUM(...Object.values(ThemeEnum)),
    allowNull: false,
    verbose: 'User Theme',
    defaultValue: ThemeEnum.DARK,
  })
  declare theme?: ThemeEnum;

  declare getProfile: HasOneGetAssociationMixin<Profile>;
  declare createProfile: HasOneCreateAssociationMixin<Profile>;
  declare setProfile: HasOneSetAssociationMixin<Profile, 'userId'>;
  declare profile?: NonAttribute<Profile>;

  public async createBlankProfile(user: User) {
    const fields = Profile.getKeys();
    const emptyProfile: { [key: string]: string } = {};

    for (const field of fields) {
      emptyProfile[field] = '';
    }

    await user.createProfile(emptyProfile);
  }

  public static hooks = {
    beforeCreate: async (instance: User) => {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(instance.password, salt);
      instance.password = hashedPassword;
      instance.salt = salt;
    },
    afterCreate: async (user: User) => {
      user.createBlankProfile(user);
    },
  };
}

User.init(
  {
    ...SyModel.metaFields,
    ...User.fields,
  },
  {
    hooks: User.hooks,
    tableName: 'users',
    sequelize,
  }
);

Profile.belongsTo(User, { targetKey: 'id' });
User.hasOne(Profile, { sourceKey: 'id' });

//

export async function doStuffWithUser() {
  const newUser = await User.create({
    username: 'Johnny',
    password: 'John',
  });
  console.log(newUser.id, newUser.username, newUser.password);
}

// console.log(User.metadata);
// console.log(User.fields);
// console.log(User.getKeys());
