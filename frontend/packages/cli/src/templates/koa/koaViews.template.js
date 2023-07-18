export const KoaViewsTemplate = (modelName, lowercaseName) =>
  `
  import Koa from 'koa';

  import { SyViews } from '../core/SyViews';
  import { ${modelName} } from '../models/${lowercaseName}';
  import { ${modelName}Schema } from '../schemas';
  
  export class ${modelName}Views extends SyViews {
    static options = {};
  
    constructor(app: Koa) {
      super(${modelName}, ${modelName}Schema, app);
    }
  }
  `;
