import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Field } from '../core/decorators/models';
import { sequelize } from '../settings';
import { SyModel } from '../core/SyModel';
import { Op } from 'sequelize';

export class Request extends SyModel<InferAttributes<Request>, InferCreationAttributes<Request>> {
  @Field({
    type: DataTypes.STRING(10),
    verbose: 'Request Method',
  })
  declare method: string;

  @Field({
    type: DataTypes.STRING(50),
    verbose: 'Endpoint',
  })
  declare endpoint: string;

  @Field({
    type: DataTypes.JSON,
    verbose: 'Request Headers',
  })
  declare headers: JSON;

  @Field({
    type: DataTypes.JSON,
    verbose: 'Request Payload',
  })
  declare payload: JSON;

  /**
   * Deletes old requests from the database.
   * Requests older than 60 days will be removed.
   * @log The count of removed requests.
   */
  public static async deleteOldRequests() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 60);

    const count = await Request.destroy({
      where: {
        createdAt: {
          [Op.lt]: cutoffDate,
        },
      },
    });

    console.log(`Removed: ${count} Requests`);
  }
}

Request.init(
  {
    ...SyModel.metaFields,
    ...Request.fields,
  },
  {
    tableName: 'request',
    sequelize,
  }
);
