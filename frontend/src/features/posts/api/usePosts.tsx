import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

import { PostContent, PostsContent, PostsResponse } from '../types';

export type SetPostsDataFn = (data: PostsContent) => void;

export const getPosts = (): Promise<PostsResponse> => {
  return axios.get<PostContent[]>(`/post/`);
};

export const setPosts = (data: PostsContent, setData: SetPostsDataFn): void => {
  setData({
    posts: data.posts,
    tags: data.tags,
  });
};

export const usePosts = async (setData: SetPostsDataFn, setError: SetErrorFn) => {
  try {
    const response = await getPosts();
    const postsContent: PostsContent = {
      posts: response.data,
      tags: response.data[0].tags_options,
    };
    setPosts(postsContent, setData);
  } catch (error) {
    setError(error);
  }
};
