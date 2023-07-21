import Koa from 'koa';
import { RequestController } from '../controllers';
import { SyRoutes } from '../core/SyRoutes';

export class RequestRoutes extends SyRoutes<RequestController> {
  constructor(app: Koa) {
    super(new RequestController(app.context.logger), 'request', app);
  }
}
