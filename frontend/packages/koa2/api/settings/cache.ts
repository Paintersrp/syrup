import { SyCache } from '../core/SyCache';
import { ORM } from './db';
import { logger } from './loggers';

export const cache = new SyCache(ORM.database, logger);
