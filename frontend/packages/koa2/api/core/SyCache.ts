import { Logger } from 'pino';
import { Sequelize, Transaction } from 'sequelize';
import { Cache } from '../models/cache';

export interface CacheInterface {
  value: any;
  expires?: Date | null;
  lastAccessed?: Date;
}

/**
 * @todo Mixin for modularity
 *
 * @classdesc Class representing a hybrid cache with in-memory storage and ORM-supported persistence.
 */
export class SyCache {
  private cacheMap: Map<string, CacheInterface>;
  private database: Sequelize;
  private logger: Logger;
  private defaultTTL: number | null;
  private maxCacheSize: number;
  private transaction: Transaction | undefined;
  private cacheStats: { hits: number; misses: number; evictions: number };

  /**
   * Create a new instance of SyCache.
   * @param {Sequelize} database - The Sequelize instance for ORM support.
   * @param {Logger} logger - The Pino logger instance for logging.
   * @param {number} [defaultTTL=null] - The default Time-to-Live for cache in seconds (optional).
   * @param {number} [maxCacheSize=5000] - The maximum size of the in-memory cache (optional).
   */
  constructor(
    database: Sequelize,
    logger: Logger,
    defaultTTL: number | null = null,
    maxCacheSize: number = 5000
  ) {
    this.cacheMap = new Map();
    this.logger = logger;
    this.database = database;
    this.defaultTTL = defaultTTL;
    this.maxCacheSize = maxCacheSize;
    this.cacheStats = { hits: 0, misses: 0, evictions: 0 };
  }

  /**
   * Load the cache from the database on cache initialization.
   */
  private async loadCacheFromDatabase(): Promise<void> {
    try {
      const cacheData = await Cache.findOne({ order: [['createdAt', 'DESC']] });

      if (cacheData) {
        this.cacheMap = new Map(Object.entries(cacheData.contents));
      }
    } catch (error) {
      this.logger.error('Error loading cache from the database:', error);
    }
  }

  /**
   * Save the current cache data to the database.
   */
  private async saveCacheToDatabase(): Promise<void> {
    try {
      const cacheDataObject: { [key: string]: CacheInterface } = {};
      this.cacheMap.forEach((value, key) => {
        cacheDataObject[key] = value;
      });

      await Cache.create({
        contents: JSON.parse(JSON.stringify(cacheDataObject)),
      });
    } catch (error) {
      this.logger.error('Error saving cache data to the database:', error);
    }
  }

  /**
   * Automatically evict expired cache items.
   */
  private async autoEvictExpiredItems(): Promise<void> {
    const now = new Date();
    for (const [key, cacheItem] of this.cacheMap) {
      if (cacheItem.expires && cacheItem.expires < now) {
        this.cacheMap.delete(key);
      }
    }
  }

  /**
   * Delete the least recently used item when the cache is full.
   */
  private evictLRUItem(): void {
    let lruKey = null;
    let lruLastAccess = new Date();

    this.cacheMap.forEach((value, key) => {
      if (!value.lastAccessed || value.lastAccessed < lruLastAccess) {
        lruKey = key;
        lruLastAccess = value.lastAccessed!;
      }
    });

    if (lruKey) {
      this.cacheMap.delete(lruKey);
      this.cacheStats.evictions++;
      this.logger.debug(`Evicted item: ${lruKey} from the cache.`);
    }
  }

  /**
   * Refresh an item's expiration if it's near to expire and accessed again.
   * @param {string} key - The key of the cache item to refresh the expiration for.
   * @param {CacheInterface} cacheItem - The cache item to refresh the expiration for.
   */
  private refreshItemExpiration(key: string, cacheItem: CacheInterface): void {
    const refreshThreshold = 0.2;
    if (
      cacheItem.expires &&
      Date.now() - cacheItem.expires.getTime() < refreshThreshold * this.defaultTTL!
    ) {
      this.set(key, cacheItem.value, this.defaultTTL);
      this.logger.debug(`Refreshed expiration for item: ${key}`);
    }
  }

  /**
   * Handle process shutdown to ensure cache data is saved.
   */
  private handleShutdown(): void {
    process.on('SIGTERM', async () => {
      this.logger.info('Process is shutting down...');
      await this.close();
      process.exit(0);
    });
  }

  /**
   * Helper method for executing transactional operations.
   * @param operation - The function representing the transactional operation.
   */
  private async executeInTransaction(operation: () => Promise<void>): Promise<void> {
    try {
      this.transaction = await this.database.transaction();
      await operation();
      await this.transaction.commit();
    } catch (error) {
      if (this.transaction) {
        await this.transaction.rollback();
      }
      throw error;
    }
  }

  /**
   * Initialize the cache, load data from the database.
   */
  async start(): Promise<void> {
    try {
      await this.database.sync();
      this.logger.info('Cache Initiated');

      await this.executeInTransaction(async () => {
        await this.loadCacheFromDatabase();
      });
    } catch (error) {
      this.logger.error('Error during cache start:', error);
    }
  }

  /**
   * Set a value in the cache with an optional Time-to-Live (TTL).
   * @param key - The key for the cache item.
   * @param value - The value to be cached.
   * @param ttl - The Time-to-Live (TTL) for the cache item in seconds (optional).
   */
  async set(key: string, value: any, ttl: number | null): Promise<void> {
    if (this.cacheMap.size >= this.maxCacheSize) {
      this.evictLRUItem();
    }

    const cacheItem: CacheInterface = {
      value,
      lastAccessed: new Date(),
      expires: ttl
        ? new Date(Date.now() + ttl * 1000)
        : this.defaultTTL
        ? new Date(Date.now() + this.defaultTTL * 1000)
        : null,
    };
    this.cacheMap.set(key, cacheItem);
  }

  /**
   * Get the cached value for a given key.
   * @param key - The key to retrieve from the cache.
   * @returns The cached value if found, otherwise null.
   */
  get(key: string): any {
    const cacheItem = this.cacheMap.get(key);
    if (!cacheItem || (cacheItem.expires && cacheItem.expires < new Date())) {
      this.cacheMap.delete(key);
      this.cacheStats.misses++;
      return null;
    }
    cacheItem.lastAccessed = new Date();
    this.refreshItemExpiration(key, cacheItem);
    this.cacheStats.hits++;
    this.monitorCachePerformance();
    return cacheItem.value;
  }

  /**
   * Delete a cached item by its key.
   * @param key - The key of the cached item to be deleted.
   */
  del(key: string): void {
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key);
    }
  }

  /**
   * Clear the entire cache.
   */
  clear(): void {
    this.cacheMap.clear();
  }

  /**
   * Close the cache and save its contents to the database.
   */
  async close(): Promise<void> {
    await this.autoEvictExpiredItems();

    await this.executeInTransaction(async () => {
      await this.saveCacheToDatabase();
    });

    this.handleShutdown();
    this.logger.info('Cache successfully closed and saved.');
  }

  /**
   * Clear the cache database.
   */
  async clearDatabase(): Promise<void> {
    try {
      await Cache.destroy({ truncate: true });
      this.logger.info('Cache database cleared.');
    } catch (error) {
      this.logger.error('Error clearing cache database:', error);
    }
  }

  /**
   * Get the current size of the cache.
   * @returns The number of items in the cache.
   */
  async getCacheSize(): Promise<number> {
    return this.cacheMap.size;
  }

  /**
   * Get the current cache statistics.
   * @returns An object with the current number of cache hits, misses, and evictions.
   */
  getCacheStats(): { hits: number; misses: number; evictions: number } {
    return this.cacheStats;
  }

  /**
   * Monitor the cache's performance and log any anomalies.
   */
  monitorCachePerformance(): void {
    const hitRatio = this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses);
    if (hitRatio < 0.8) {
      this.logger.error(`Cache hit ratio dropped below 80%: ${hitRatio}`);
    }

    if (this.cacheStats.evictions > 100) {
      this.logger.error(`Cache evictions exceeded 100: ${this.cacheStats.evictions}`);
    }
  }
}
