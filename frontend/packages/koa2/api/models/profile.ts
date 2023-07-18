import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import { faker } from '@faker-js/faker';

import { Field } from '../core/decorators/models';
import { sequelize } from '../settings';
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
    type: DataTypes.STRING(20),
    verbose: 'Phone Number',
  })
  declare phone: CreationOptional<string>;

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

  static async seedProfile(count: number) {
    try {
      const profileData = [];

      for (let i = 0; i < count; i++) {
        const email = faker.internet.email();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const bio = faker.lorem.sentence();
        const city = faker.location.city();
        const country = faker.location.country();
        const phone = faker.phone.number();
        const facebook = faker.internet.userName();
        const instagram = faker.internet.userName();
        const threads = faker.internet.userName();
        const twitter = faker.internet.userName();
        const linkedIn = faker.internet.userName();
        const github = faker.internet.userName();
        const youtube = faker.internet.userName();

        profileData.push({
          email,
          firstName,
          lastName,
          bio,
          city,
          country,
          phone,
          facebook,
          instagram,
          threads,
          twitter,
          linkedIn,
          github,
          youtube,
        });
      }

      await Profile.bulkCreate(profileData);

      console.log('Profile seeding completed successfully.');
    } catch (error) {
      console.error('Profile seeding failed:', error);
    }
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

// Profile.seedProfile(10);
