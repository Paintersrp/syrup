import { axios } from '@/lib';
import { ErrorResponse } from '@/types';

export type SetContactDataFn = (data: any) => void;
export type SetErrorFn = (error: ErrorResponse | unknown) => void;

export const getContacts = (): Promise<any> => {
  return axios.get<any>(`/contacts/`);
};

export const setContacts = (data: any, setData: SetContactDataFn): void => {
  setData({
    members: data.members,
    contactInfo: data.contactInfo,
    socials: data.socials,
    hours: data.hours,
    jobs: data.jobs,
  });
};

export const useContacts = async (setData: SetContactDataFn, setError: SetErrorFn) => {
  try {
    const response = await getContacts();
    setContacts(response.data, setData);
  } catch (error) {
    setError(error);
  }
};
