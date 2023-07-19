import Koa from 'koa';
import Router from 'koa-router';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SyViews } from '../core/SyViews';

import { User } from '../models/user';
import { UserSchema } from '../schemas';

import { Blacklist } from '../models/blacklist';
import { InferCreationAttributes } from 'sequelize';
import { JWT_SECRET } from '../settings';

/**
 * Class representing user views and routes.
 */
export class UserViews extends SyViews {
  static options = {};

  /**
   * Creates an instance of UserViews.
   * @param {Koa} app - The Koa application instance.
   */
  constructor(app: Koa) {
    super(User, UserSchema, app);

    this.validateUserBody = this.validateUserBody.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refresh_token = this.refresh_token.bind(this);

    this.router.post(`/register`, this.validateUserBody, this.register);
    this.router.post(`/login`, this.validateUserBody, this.login);
    this.router.get(`/logout`, this.logout);
    this.router.post(`/refresh-token`, this.refresh_token);
    this.router.get(`/health`);

    this.addRoutesToApp(app);
  }

  /**
   * Middleware to validate the request body against the defined schema.
   * @param {Router.RouterContext} ctx - The Koa router context.
   * @param {() => Promise<any>} next The next middleware function.
   */
  async validateUserBody(ctx: Router.RouterContext, next: () => Promise<any>) {
    const fields = ctx.request.body as InferCreationAttributes<User>;

    if (fields) {
      try {
        await this.validate(fields);
        await next();
      } catch (error) {
        ctx.status = 400;
        ctx.body = { message: 'Invalid request body', error: error };
      }
    }
  }

  /**
   * Registers a new user.
   */
  async register(ctx: Router.RouterContext): Promise<void> {
    const fields = ctx.request.body as InferCreationAttributes<User>;

    if (fields) {
      try {
        await User.create(fields);
        ctx.body = 'User registered successfully';
      } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error registering user', error: error };
      }
    }
  }

  /**
   * Logs in a user and generates access and refresh tokens.
   */
  async login(ctx: Router.RouterContext) {
    const { username, password } = ctx.request.body as {
      [key: string]: string;
    };
    const hasToken = await this.checkForToken(ctx);

    if (!hasToken) {
      try {
        const user = await User.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
          if (user.refreshToken) {
            const decodedOriginalRefresh = jwt.decode(user.refreshToken) as jwt.JwtPayload;
            if (decodedOriginalRefresh) {
              await this.blacklistToken(user.refreshToken);
            }
          }

          const accessToken = jwt.sign({ username, role: user.role }, JWT_SECRET, {
            expiresIn: '480h',
          });
          const refreshToken = jwt.sign({ username }, JWT_SECRET);

          ctx.cookies.set('jwt', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 48,
          });
          ctx.cookies.set('refreshToken', refreshToken, { httpOnly: true });

          user.refreshToken = refreshToken;
          await user.save();

          ctx.body = { accessToken, refreshToken };
        } else {
          ctx.status = 401;
          ctx.body = 'Invalid credentials';
        }
      } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = 'Error logging in';
      }
    }
  }

  /**
   * Refreshes the access token using the refresh token.
   */
  async refresh_token(ctx: Router.RouterContext) {
    const { refreshToken } = ctx.request.body as { [key: string]: string };
    const originalAccessToken = ctx.cookies.get('jwt');

    if (originalAccessToken) {
      try {
        const decodedToken: any = jwt.verify(refreshToken, JWT_SECRET);
        const user = await User.findOne({
          where: { username: decodedToken.username },
        });

        if (user && user.refreshToken === refreshToken) {
          const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
            expiresIn: '480h',
          });

          ctx.cookies.set('jwt', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 48,
          });

          await this.blacklistToken(originalAccessToken);
          ctx.body = { accessToken };
        } else {
          ctx.status = 401;
          ctx.body = 'Invalid refresh token';
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = 'Error refreshing token';
      }
    }
  }

  /**
   * Logs out the user by blacklisting the access token.
   */
  async logout(ctx: Router.RouterContext) {
    const accessToken = ctx.cookies.get('jwt');

    if (accessToken) {
      try {
        await this.blacklistToken(accessToken);
        ctx.cookies.set('jwt', '', { signed: false, expires: new Date(0) });
        ctx.cookies.set('refreshToken', '', {
          signed: false,
          expires: new Date(0),
        });
        ctx.body = 'Logged out successfully';
      } catch (erorr) {
        ctx.status = 500;
        ctx.body = 'Error logging out';
      }
    }
  }

  /**
   * Checks if the request contains a valid access token.
   */
  async checkForToken(ctx: Router.RouterContext): Promise<boolean> {
    const accessToken = ctx.cookies.get('jwt');

    if (accessToken) {
      try {
        const decodedToken: any = jwt.verify(accessToken, JWT_SECRET);
        const user = await User.findOne({
          where: { username: decodedToken.username },
        });

        if (user) {
          return true;
        }
      } catch (error) {
        return false;
      }
    }

    return false;
  }

  /**
   * Blacklists a token by adding it to the blacklist table.
   */
  async blacklistToken(token: string) {
    await Blacklist.create({ token });
  }

  /**
   * Checks if a token is blacklisted.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistEntry = await Blacklist.findOne({ where: { token } });
    return !!blacklistEntry;
  }
}
