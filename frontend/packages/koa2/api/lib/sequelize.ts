import { Sequelize } from 'sequelize-typescript';
import { Root } from '../features/root';
import { User } from '../features/user';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../dev.sqlite3',
  models: [Root],
});
