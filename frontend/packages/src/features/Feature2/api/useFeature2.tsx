
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { Feature2Content } from '../types';

export const getFeature2 = async (): Promise<Feature2Content> => {
  const response = await axios.get<Feature2Content>("endpoint");
  return response.data;
};

type QueryFnType = typeof getFeature2;

type UseFeature2Options = {
  config?: QueryConfig<QueryFnType>;
};

export const useFeature2 = ({ config }: UseFeature2Options = {}) => {
  const feature2Query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['feature2'],
    queryFn: () => getFeature2(),
  });

  return feature2Query;
};
