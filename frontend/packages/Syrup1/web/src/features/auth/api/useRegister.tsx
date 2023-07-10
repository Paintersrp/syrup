import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

import { SetErrorFn } from '@/types';

import { getUser, hashPassword } from './useLogin';
import { AuthStore } from '@/stores/auth';
import { AlertStore } from '@/stores/alert';
import { axios } from '@/lib/axios';

const createSalt = async (rounds: number = 12): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
};

export const postUser = (formData: any): Promise<any> => {
  return axios.post<any>(`/auth/register/`, formData);
};

export const useRegister = async (
  formData: any,
  navigate: any,
  setError: SetErrorFn,
  alertStore: AlertStore,
  authStore: AuthStore
) => {
  try {
    const salt = await createSalt();
    const loginData = await hashPassword(formData, salt);
    await postUser({
      ...formData,
      password: loginData.password,
      salt: salt,
    });

    const response = await getUser(loginData);
    authStore.handleAuth(response);

    const expires = new Date(Date.parse(response.data.exp));
    Cookies.set('jwt', response.data.jwt, { expires });
    Cookies.set('username', formData.username, { expires: 90 });

    navigate('/');
    setTimeout(() => {
      alertStore.showAlert('success', 'Login Successful');
    }, 275);
  } catch (error) {
    setError(error);
    alertStore.showAlert('error', 'Error occurred, try again later');
  }
};
