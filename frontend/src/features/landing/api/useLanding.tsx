import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { LandingContent } from '../types';

export type SetLandingDataFn = (data: LandingContent) => void;

export const getLanding = async (): Promise<LandingContent> => {
  const response = await axios.get<LandingContent>(`/landing/`);
  return response.data;
};

type QueryFnType = typeof getLanding;

type UseLandingOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useLanding = ({ config }: UseLandingOptions = {}) => {
  const landingQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['landing'],
    queryFn: () => getLanding(),
  });

  return landingQuery;
};
