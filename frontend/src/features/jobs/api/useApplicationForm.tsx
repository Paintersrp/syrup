import { axios } from '@/lib/api';
import { AlertStore } from '@/stores/alert';

export const applicationFields = [
  {
    helpText: 'First Name',
    name: 'first_name',
  },
  {
    helpText: 'Last Name',
    name: 'last_name',
  },
  {
    helpText: 'Email',
    name: 'email',
  },
  {
    helpText: 'Phone',
    name: 'phone',
  },
  {
    helpText: 'City',
    name: 'city',
  },
  {
    helpText: 'Zip Code',
    name: 'zipcode',
  },
];

export type ApplicationDTO = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  zipcode: string;
  resume: File | null;
  job?: string;
};

export const initialApplicationData: ApplicationDTO = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  city: '',
  zipcode: '',
  resume: null,
  job: '',
};

export type ResetFormFn = (data: ApplicationDTO) => void;

export const postApplication = (values: ApplicationDTO): Promise<any> => {
  return axios.post<ApplicationDTO>(`/application/`, values);
};

export const useApplicationForm = async (
  resetForm: ResetFormFn,
  values: ApplicationDTO,
  alertStore: AlertStore
) => {
  try {
    await postApplication(values);
    resetForm(initialApplicationData);
    alertStore.showAlert('success', 'Application Sent');
  } catch (error) {
    alertStore.showAlert('success', 'Error occurred, try again later');
  }
};
