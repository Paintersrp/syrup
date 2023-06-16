import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { AboutContent } from '../types';

export type SetAboutDataFn = (data: AboutContent) => void;

export const getAbout = async (): Promise<AboutContent> => {
  const response = await axios.get<AboutContent>(`/about/`);
  return response.data;
};

type QueryFnType = typeof getAbout;

type UseAboutOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useAbout = ({ config }: UseAboutOptions = {}) => {
  const aboutQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['about'],
    queryFn: () => getAbout(),
  });

  return aboutQuery;
};
