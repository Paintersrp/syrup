import { Interval } from '../core/lib';
import { Request } from '../models';
import { schedule } from '../utils/schedule';

schedule(async () => {
  Request.deleteOldRequests();
}, Interval.Biweekly);
