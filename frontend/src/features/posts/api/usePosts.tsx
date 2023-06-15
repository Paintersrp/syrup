import { useQuery } from 'react-query';

import { axios } from '@/lib/api';

import { PostContent, PostsContent } from '../types';

export type SetPostsDataFn = (data: PostsContent) => void;

export const getPosts = async () => {
  const response = await axios.get<PostContent[]>(`/post/`);
  return response.data;
};

export const usePosts = () => {
  const { data, error, isLoading } = useQuery<PostContent[], Error>('posts', getPosts);

  return {
    data: data ?? [],
    tags: data ? data[0]?.tags_options ?? [] : [],
    isLoading,
    error,
  };
};
