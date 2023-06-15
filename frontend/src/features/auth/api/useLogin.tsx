import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';

import { axios } from '@/lib/api';
import { setAuth, setUser } from '@/lib/redux';
import { SetErrorFn } from '@/types';

import { AuthContent, AuthResponse, LoginFormDTO } from '../types';

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

export function dispatchAuth(res: AuthResponse, dispatch: Dispatch): void {
  dispatch(
    setAuth({
      is_authenticated: res.data.authenticated,
    })
  );
  dispatch(
    setUser({
      is_superuser: res.data.is_superuser,
      username: res.data.username,
    })
  );
}

export const useLogin = async (
  formData: LoginFormDTO,
  loginData: LoginDTO,
  dispatch: Dispatch,
  navigate: any,
  setError: SetErrorFn
) => {
  try {
    const response = await getUser(loginData);

    dispatchAuth(response, dispatch);

    if (formData.remember) {
      const expires = new Date(Date.parse(response.data.exp));
      Cookies.set('jwt', response.data.jwt, { expires });
      Cookies.set('username', formData.username, { expires: 90 });
    }

    navigate('/');

    setTimeout(() => {
      dispatch({ type: 'ALERT_SUCCESS', message: 'Login Successful' });
    }, 275);
  } catch (error) {
    setError(error);
    dispatch({
      type: 'ALERT_FAIL',
      message: 'Error occurred, try again later',
    });
  }
};
