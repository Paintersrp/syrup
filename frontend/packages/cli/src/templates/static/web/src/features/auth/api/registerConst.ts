import { RegisterDTO } from '../types';

export const registerInitialData: RegisterDTO = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
};

export const registerFields = [
  {
    label: 'First Name',
    id: 'firstName',
    autoComplete: 'fname',
  },
  {
    label: 'Last Name',
    id: 'lastName',
    autoComplete: 'lname',
  },
  {
    label: 'Username',
    id: 'username',
    autoComplete: 'username',
  },
  {
    label: 'Email Address',
    id: 'email',
    autoComplete: 'email',
  },
  {
    label: 'Password',
    id: 'password',
    autoComplete: 'current-password',
    type: 'password',
  },
];

export const advancedRegisterFields = [
  {
    id: 'phone',
    label: 'Phone Number',
    autoComplete: 'phone',
    type: 'tel',
    grid: 12,
  },
  {
    id: 'address',
    label: 'Address',
    autoComplete: 'address',
    type: 'text',
    grid: 12,
  },
  {
    id: 'city',
    label: 'City',
    autoComplete: 'city',
    type: 'text',
  },
  {
    id: 'state',
    label: 'State',
    autoComplete: 'state',
    type: 'text',
  },

  {
    id: 'zipcode',
    label: 'Zipcode',
    autoComplete: 'zipcode',
    type: 'text',
  },
  {
    id: 'country',
    label: 'Country',
    autoComplete: 'country',
    type: 'text',
  },
];
