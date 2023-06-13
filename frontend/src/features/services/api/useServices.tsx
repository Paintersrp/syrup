import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

export type SetServiceDataFn = (data: any) => void;

export const getServices = (): Promise<any> => {
  return axios.get<any>(`/services/`);
};

export const setServices = (data: any, setData: SetServiceDataFn): void => {
  setData({
    services: data.services,
    servicesTable: data.servicesTable,
    competitorsTable: data.competitorsTable,
    quizData: data.quizData,
    benefits: data.benefits,
    benefitsHeader: data.benefitsHeader,
  });
};

export const useServices = async (setData: SetServiceDataFn, setError: SetErrorFn) => {
  try {
    const response = await getServices();
    console.log(response.data);
    setServices(response.data, setData);
  } catch (error) {
    setError(error);
  }
};
