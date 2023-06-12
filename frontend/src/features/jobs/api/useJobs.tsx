import { axios } from '@/lib';
import { ErrorResponse } from '@/types';

import { JobType } from '../types';

export type SetJobDataFn = (data: any) => void;
export type SetErrorFn = (error: ErrorResponse | unknown) => void;

export const getJobs = (): Promise<any> => {
  return axios.get<any>(`/jobposting/`);
};

export const setJobs = (
  data: any,
  setData: SetJobDataFn,
  setCurrent: SetJobDataFn,
  id: number
): void => {
  setData(data);
  setCurrent(data.find((jobData: JobType) => jobData.id === id));
};

export const useJobs = async (
  setData: SetJobDataFn,
  setCurrent: SetJobDataFn,
  setError: SetErrorFn,
  id: number
) => {
  try {
    const response = await getJobs();
    setJobs(response.data, setData, setCurrent, id);
  } catch (error) {
    setError(error);
  }
};
