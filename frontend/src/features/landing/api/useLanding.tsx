import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

import { LandingContent, LandingResponse } from '../types';

export type SetLandingDataFn = (data: LandingContent) => void;

export const getLanding = (): Promise<LandingResponse> => {
  return axios.get<LandingContent>(`/landing/`);
};

export const setLanding = (data: LandingContent, setData: SetLandingDataFn): void => {
  setData({
    hero: data.hero,
    socials: data.socials,
    contactInfo: data.contactInfo,
    processes: data.processes,
    processHeader: data.processHeader,
    posts: data.posts,
    postsHeader: data.postsHeader,
    services: data.services,
  });
};

export const useLanding = async (setData: SetLandingDataFn, setError: SetErrorFn) => {
  try {
    const response = await getLanding();
    setLanding(response.data, setData);
  } catch (error) {
    setError(error);
  }
};
