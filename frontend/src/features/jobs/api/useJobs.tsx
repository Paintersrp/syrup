import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

import { axios, ExtractFnReturnType } from '@/lib/api';

import { JobContent } from '../types';

export type SetJobsDataFn = (data: JobContent[]) => void;
export type SetJobDataFn = (data: JobContent | null) => void;

export const getJobs = async (): Promise<JobContent[]> => {
  const response = await axios.get<JobContent[]>(`/jobposting/`);
  return response.data;
};

type QueryFnType = typeof getJobs;

export const useJobs = (id: string) => {
  const { data, error, isLoading } = useQuery<ExtractFnReturnType<QueryFnType>>('jobs', getJobs);
  const [current, setCurrent] = useState<JobContent | null>();

  useEffect(() => {
    if (data) {
      const currentJob = data.find((jobData: JobContent) => jobData.id === parseInt(id));
      if (currentJob) {
        setCurrent(currentJob);
      } else if (data.length > 0) {
        setCurrent(data[0]);
      } else {
        setCurrent(null);
      }
    }
  }, [id, data]);

  return {
    data: data ?? [],
    current: current,
    isLoading,
    error,
  };
};
