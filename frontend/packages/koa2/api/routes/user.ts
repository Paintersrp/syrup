import Koa from 'koa';
import { UserController } from '../controllers';
import { SyRoutes } from '../core/SyRoutes';

export class UserRoutes extends SyRoutes<UserController> {
  constructor(app: Koa) {
    super(new UserController(app.context.logger), 'users', app);

    this.controller.validateUserBody = this.controller.validateUserBody.bind(this.controller);
    this.controller.register = this.controller.register.bind(this.controller);
    this.controller.login = this.controller.login.bind(this.controller);
    this.controller.logout = this.controller.logout.bind(this.controller);
    this.controller.refresh_token = this.controller.refresh_token.bind(this.controller);

    this.router.post(`/register`, this.controller.validateUserBody, this.controller.register);
    this.router.post(`/login`, this.controller.validateUserBody, this.controller.login);
    this.router.get(`/logout`, this.controller.logout);
    this.router.post(`/refresh-token`, this.controller.refresh_token);
    this.router.get(`/health`);

    this.addRoutesToApp(app);
  }
}
