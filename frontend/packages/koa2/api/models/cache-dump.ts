import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { Field } from '../core/decorators/models';
import { sequelize } from '../settings';
import { SyModel } from '../core/SyModel';

export interface CacheDumpInterface {
  key: string;
  value: any;
  expires?: Date | null;
}

export class CacheDump extends SyModel<
  InferAttributes<CacheDump>,
  InferCreationAttributes<CacheDump>
> {
  @Field({
    type: DataTypes.JSON,
    verbose: 'Cache Contents',
  })
  declare contents: JSON;
}

CacheDump.init(
  {
    ...SyModel.metaFields,
    ...CacheDump.fields,
  },
  {
    tableName: 'cache_dump',
    sequelize,
  }
);
