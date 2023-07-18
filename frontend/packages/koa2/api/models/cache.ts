import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { Field } from '../core/decorators/models';
import { sequelize } from '../settings';
import { SyModel } from '../core/SyModel';

export class Cache extends SyModel<InferAttributes<Cache>, InferCreationAttributes<Cache>> {
  @Field({
    type: DataTypes.STRING,
    verbose: 'response',
    unique: true,
  })
  declare cacheKey: string;

  @Field({
    type: DataTypes.JSON,
    verbose: 'Cached Response',
  })
  declare response: JSON;
}

Cache.init(
  {
    ...SyModel.metaFields,
    ...Cache.fields,
  },
  {
    tableName: 'cache',
    sequelize,
  }
);
