import { axios } from '@/lib';
import { ErrorResponse } from '@/types';
import { AboutContent, AboutResponse } from '../types';

export type SetAboutDataFn = (data: AboutContent) => void;
export type SetErrorFn = (error: ErrorResponse | unknown) => void;

export const getAbout = (): Promise<AboutResponse> => {
  return axios.get<AboutContent>(`/about/`);
};

export const setAbout = (data: AboutContent, setData: SetAboutDataFn): void => {
  setData({
    header: data.header,
    missionStatement: data.missionStatement,
    companyHistory: data.companyHistory,
    values: data.values,
  });
};

export const useAbout = async (setData: SetAboutDataFn, setError: SetErrorFn) => {
  try {
    const response = await getAbout();
    setAbout(response.data, setData);
  } catch (error) {
    setError(error);
  }
};
