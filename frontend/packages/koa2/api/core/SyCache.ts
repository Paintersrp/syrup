import { Logger } from 'pino';
import { Sequelize } from 'sequelize';
import { CacheDump } from '../models/cache-dump';
import { logger as AppLogger, sequelize } from '../settings';

export interface CacheDumpInterface {
  value: any;
  expires?: Date | null;
}

export class SyCache {
  private cacheMap: Map<string, CacheDumpInterface>;
  private database: Sequelize;
  private logger: Logger;

  constructor(database: Sequelize = sequelize, logger: Logger = AppLogger) {
    this.cacheMap = new Map();
    this.logger = logger;
    this.database = database;
    this.database.sync();
  }

  async init(): Promise<void> {
    this.logger.info('Cache Initiated');
    try {
      const cacheData = await CacheDump.findOne({ order: [['createdAt', 'DESC']] });

      if (cacheData) {
        this.cacheMap = new Map(Object.entries(cacheData.contents));
      }
    } catch (error) {
      this.logger.error('Error loading cache from the database:', error);
    }
  }

  async set(key: string, value: any, ttl: number | null = null): Promise<void> {
    const cacheItem = { value, expires: ttl ? new Date(Date.now() + ttl * 1000) : null };
    this.cacheMap.set(key, cacheItem);
  }

  get(key: string): any {
    const cacheItem = this.cacheMap.get(key);
    if (!cacheItem || (cacheItem.expires && cacheItem.expires < new Date())) {
      this.cacheMap.delete(key);
      return null;
    }
    return cacheItem.value;
  }

  del(key: string): void {
    this.cacheMap.delete(key);
  }

  clear(): void {
    this.cacheMap.clear();
  }

  async close(): Promise<void> {
    try {
      const cacheDataObject: { [key: string]: CacheDumpInterface } = {};
      this.cacheMap.forEach((value, key) => {
        cacheDataObject[key] = value;
      });

      await CacheDump.create({
        contents: JSON.parse(JSON.stringify(cacheDataObject)),
      });
      this.logger.info('Cache successfully closed and saved.');
    } catch (error) {
      this.logger.error('Error saving cache data to the database:', error);
    }
  }
}
