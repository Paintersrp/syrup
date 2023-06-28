
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { JobsContent } from '../types';

export const getJobs = async (): Promise<JobsContent> => {
  const response = await axios.get<JobsContent>("endpoint");
  return response.data;
};

type QueryFnType = typeof getJobs;

type UseJobsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useJobs = ({ config }: UseJobsOptions = {}) => {
  const jobsQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['jobs'],
    queryFn: () => getJobs(),
  });

  return jobsQuery;
};
