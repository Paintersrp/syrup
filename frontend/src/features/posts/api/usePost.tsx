import { axios } from '@/lib/api';
import { SetErrorFn } from '@/types';

import { PostContent, PostResponse } from '../types';

export type SetPostDataFn = (data: PostContent) => void;

export const getPost = (id: number): Promise<PostResponse> => {
  return axios.get<PostContent>(`/post/${id}/`);
};

export const setPost = (data: PostContent, setData: SetPostDataFn): void => {
  setData(data);
};

export const usePost = async (setData: SetPostDataFn, setError: SetErrorFn, id: number) => {
  try {
    const response = await getPost(id);
    setPost(response.data, setData);
  } catch (error) {
    setError(error);
  }
};
