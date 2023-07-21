import { Logger } from 'pino';
import { ModelStatic, Model } from 'sequelize';

export type MixinOptions = { model: ModelStatic<Model>; logger: Logger };

export abstract class SyMixin {
  protected model: ModelStatic<any>;
  protected logger: Logger;

  /**
   * Constructs a new instance of the Mixin class.
   * @param {MixinOptions} options Options for initiating the Mixin class.
   */
  constructor(options: MixinOptions) {
    this.model = options.model;
    this.logger = options.logger;
  }
}
