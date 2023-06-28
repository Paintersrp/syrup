
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { JobContent } from '../types';

export const getJob = async (): Promise<JobContent> => {
  const response = await axios.get<JobContent>("endpoint");
  return response.data;
};

type QueryFnType = typeof getJob;

type UseJobOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useJob = ({ config }: UseJobOptions = {}) => {
  const jobQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['job'],
    queryFn: () => getJob(),
  });

  return jobQuery;
};
