
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { PostContent } from '../types';

export const getPost = async (): Promise<PostContent> => {
  const response = await axios.get<PostContent>("endpoint");
  return response.data;
};

type QueryFnType = typeof getPost;

type UsePostOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePost = ({ config }: UsePostOptions = {}) => {
  const postQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['post'],
    queryFn: () => getPost(),
  });

  return postQuery;
};
