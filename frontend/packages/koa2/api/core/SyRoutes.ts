import Koa from 'koa';
import Router from 'koa-router';

import { Logger } from 'pino';
import { SyController } from './SyController';

/**
 * Provides a reusable generic class to define routes and endpoints for a specific subclass of SyController.
 * @template T - The subclass of SyController that defines the model and controller logic.
 *
 * @example
 * // Creating routes for the User model
 * const userController = new UserController(app);
 * const userRoutes = new SyRoutes<UserController>(userController, 'users', app);
 *
 * // The following endpoints will be available for the 'users' route:
 * // - POST /users: Creates a new user record in the database. Requires validation of the request body.
 * // - GET /users/:id: Retrieves a specific user record from the database by ID.
 * // - PUT /users/:id: Updates a specific user record in the database by ID. Requires validation of the request body.
 * // - DELETE /users/:id: Deletes a specific user record from the database by ID.
 * // - GET /users: Retrieves all user records from the database with optional pagination, sorting, and filtering.
 */
export class SyRoutes<T extends SyController> {
  protected controller: T;
  protected router: Router;
  protected routeName: string;
  protected logger: Logger;

  /**
   * Constructs a new instance of the Routes class.
   * @param controller A Sequelize model representing the database table.
   * @param app An instance of Koa application.
   */
  constructor(controller: T, routeName: string, app: Koa) {
    this.controller = controller;
    this.router = new Router();
    this.routeName = routeName;
    this.logger = app.context.logger;

    /**
     * Bind methods / middlewares for router
     */
    this.controller.create = this.controller.create.bind(this.controller);
    this.controller.read = this.controller.read.bind(this.controller);
    this.controller.update = this.controller.update.bind(this.controller);
    this.controller.delete = this.controller.delete.bind(this.controller);
    this.controller.all = this.controller.all.bind(this.controller);
    this.controller.validateBody = this.controller.validateBody.bind(this.controller);
    this.controller.cacheEndpoint = this.controller.cacheEndpoint.bind(this.controller);

    // /**
    //  * Initiate controller / model routes with middlewares
    //  */
    this.router.post(`/${routeName}`, this.controller.validateBody, this.controller.create);
    this.router.get(`/${routeName}/:id`, this.controller.read);
    this.router.put(`/${routeName}/:id`, this.controller.validateBody, this.controller.update);
    this.router.delete(`/${routeName}/:id`, this.controller.delete);
    this.router.get(`/${routeName}`, this.controller.cacheEndpoint, this.controller.all);

    /**
     * Add initial routes and endpoints to application
     */
    this.addRoutesToApp(app);
  }

  /**
   * Adds the router routes and allowed methods to the Koa application.
   * @param app The Koa application.
   */
  addRoutesToApp(app: Koa) {
    app.use(this.router.routes());
    app.use(this.router.allowedMethods());
  }

  /**
   * @returns The router instance.
   */
  getRouter() {
    return this.router;
  }

  /**
   * Sets a new Sequelize model for the instance.
   * @param model A Sequelize model representing the database table.
   */
  setController(controller: T) {
    this.controller = controller;
  }
}
