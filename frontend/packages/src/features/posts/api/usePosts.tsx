
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { PostsContent } from '../types';

export const getPosts = async (): Promise<PostsContent> => {
  const response = await axios.get<PostsContent>("endpoint");
  return response.data;
};

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePosts = ({ config }: UsePostsOptions = {}) => {
  const postsQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  return postsQuery;
};
