import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { ContactContent } from '../types';

export type SetContactDataFn = (data: ContactContent) => void;

export const getContacts = async (): Promise<ContactContent> => {
  const response = await axios.get<ContactContent>(`/contacts/`);
  return response.data;
};

type QueryFnType = typeof getContacts;

type UseContactsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useContacts = ({ config }: UseContactsOptions = {}) => {
  const contactsQuery = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['contacts'],
    queryFn: () => getContacts(),
  });

  return contactsQuery;
};
