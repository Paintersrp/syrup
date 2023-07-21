import Koa from 'koa';
import { CacheController } from '../controllers';
import { SyRoutes } from '../core/SyRoutes';

export class CacheRoutes extends SyRoutes<CacheController> {
  constructor(app: Koa) {
    super(new CacheController(app.context.logger), 'cache', app);
  }
}
