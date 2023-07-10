import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

import { SetErrorFn } from '@/types';

import { AuthContent, AuthResponse, LoginFormDTO } from '../types';
import { AlertStore } from '@/stores/alert';
import { AuthStore } from '@/stores/auth';
import { axios } from '@/lib/axios';

type LoginDTO = { username: string; password: string };
type SaltResponse = { data: { salt?: string } };

export const getSalt = (username: string): Promise<SaltResponse> => {
  return axios.post<any>(`/auth/salt/`, { username: username });
};

export const hashPassword = async (formData: LoginFormDTO, salt: string): Promise<LoginDTO> => {
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(formData.password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return {
    username: formData.username,
    password: hashedPassword,
  };
};

export const useSalt = async (setError: SetErrorFn, formData: LoginFormDTO) => {
  try {
    const response = await getSalt(formData.username);
    const salt = response.data.salt;

    if (salt) {
      return hashPassword(formData, salt);
    } else {
      return {
        username: formData.username,
        password: formData.password,
      };
    }
  } catch (error) {
    setError(error);
  }
};

export const getUser = (loginData: any): Promise<AuthResponse> => {
  return axios.post<AuthContent>(`/auth/login/`, loginData);
};

export const useLogin = async (
  formData: LoginFormDTO,
  loginData: LoginDTO,
  navigate: any,
  setError: SetErrorFn,
  alertStore: AlertStore,
  authStore: AuthStore
) => {
  try {
    const response = await getUser(loginData);
    authStore.handleAuth(response);

    if (formData.remember) {
      const expires = new Date(Date.parse(response.data.exp));
      Cookies.set('jwt', response.data.jwt, { expires });
      Cookies.set('username', formData.username, { expires: 90 });
    }

    navigate('/');
    setTimeout(() => {
      alertStore.showAlert('success', 'Login Successful');
    }, 275);
  } catch (error) {
    setError(error);
    alertStore.showAlert('error', 'Error occurred, try again later');
  }
};
