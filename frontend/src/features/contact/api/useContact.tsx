import { axios } from '@/lib';
import { SetErrorFn } from '@/types';

import { ContactContent, ContactResponse } from '../types';

export type SetContactDataFn = (data: ContactContent) => void;

export const getContacts = (): Promise<ContactResponse> => {
  return axios.get<ContactContent>(`/contacts/`);
};

export const setContacts = (data: ContactContent, setData: SetContactDataFn): void => {
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
