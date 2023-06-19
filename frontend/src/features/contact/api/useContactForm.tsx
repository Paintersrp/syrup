import { axios } from '@/lib/api';
import { AlertStore } from '@/stores/alert';

export const contactFields = [
  {
    label: 'Full Name',
    id: 'name',
    autoComplete: 'name',
  },
  {
    label: 'Email Address',
    id: 'email',
    autoComplete: 'email',
  },
  {
    label: 'Phone',
    id: 'phone',
    autoComplete: 'phone',
  },
  {
    label: 'Message',
    id: 'message',
    autoComplete: 'message',
    multiline: true,
  },
];

export const subjectOptions = [
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'Support', value: 'Support' },
  { label: 'Partnership', value: 'Partnership' },
  { label: 'Other', value: 'Other' },
];

export type ContactDTO = {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
};

export const initialContactData: ContactDTO = {
  name: '',
  email: '',
  phone: '',
  message: '',
  subject: 'None',
};

export type ResetFormFn = (data: any) => void;

export const postMessage = (values: ContactDTO): Promise<any> => {
  return axios.post<any>(`/messages/`, values);
};

export const useContactForm = async (
  resetForm: ResetFormFn,
  values: ContactDTO,
  alertStore: AlertStore
) => {
  try {
    await postMessage(values);
    resetForm(initialContactData);
    alertStore.showAlert('success', 'Message Sent');
  } catch (error) {
    alertStore.showAlert('error', 'Error occurred, try again later');
  }
};
