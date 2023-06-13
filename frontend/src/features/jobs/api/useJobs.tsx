import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

import { JobContent, JobResponse } from '../types';

export type SetJobsDataFn = (data: JobContent[]) => void;
export type SetJobDataFn = (data: JobContent | null) => void;

export const getJobs = (): Promise<JobResponse> => {
  return axios.get<JobContent[]>(`/jobposting/`);
};

type SetJobsFn = (
  data: JobContent[],
  setData: SetJobsDataFn,
  setCurrent: SetJobDataFn,
  id: number
) => void;

export const setJobs: SetJobsFn = (data, setData, setCurrent, id) => {
  setData(data);
  const currentJob = data.find((jobData: JobContent) => jobData.id === id);

  if (currentJob) {
    setCurrent(currentJob);
  } else if (data.length > 0) {
    setCurrent(data[0]);
  } else {
    setCurrent(null);
  }
};

export const useJobs = async (
  setData: SetJobsDataFn,
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
