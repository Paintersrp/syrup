import { SyCache } from '../core/SyCache';
import { ORM } from './db';
import { logger } from './logger';

export const cache = new SyCache(ORM.database, logger);
