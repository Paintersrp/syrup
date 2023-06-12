import { axios } from '@/lib';

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

export const useContactForm = async (resetForm: ResetFormFn, values: ContactDTO, dispatch: any) => {
  try {
    await postMessage(values);
    resetForm(initialContactData);
    dispatch({ type: 'ALERT_SUCCESS', message: 'Message Sent' });
  } catch (error) {
    dispatch({
      type: 'ALERT_FAIL',
      message: 'Error occurred, try again later',
    });
  }
};
