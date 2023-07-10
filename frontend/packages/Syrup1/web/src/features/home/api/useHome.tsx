import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/query';

import { HomeContent } from '../types';

export type SetHomeDataFn = (data: HomeContent) => void;

export const getHome = async (): Promise<HomeContent> => {
  const response = await axios.get<HomeContent>(`/home/`);
  return response.data;
};

type QueryFnType = typeof getHome;

type UseHomeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useHome = ({ config }: UseHomeOptions = {}) => {
  const homeQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['home'],
    queryFn: () => getHome(),
  });

  return homeQuery;
};
