import { Sequelize } from 'sequelize';

export const DB_PATH = '../dev.sqlite3';
export const DB_TYPE = 'sqlite';

export const sequelize = new Sequelize({
  dialect: DB_TYPE,
  storage: DB_PATH,
  logging: false,
});
