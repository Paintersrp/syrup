import { ModelStatic, Model } from 'sequelize';

export abstract class SyMixin {
  protected model: ModelStatic<any>;

  /**
   * Constructs a new instance of the Mixin class.
   * @param model A Sequelize model representing the database table.
   */
  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }
}
