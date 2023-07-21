import { Interval } from '../core/lib';
import { schedule } from '../helpers';
import { Request } from '../models';

schedule(async () => {
  Request.deleteOldRequests();
}, Interval.Biweekly);
