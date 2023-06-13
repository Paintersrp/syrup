import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';

import { axios, setAuth, setUser } from '@/lib';
import { SetErrorFn } from '@/types';
import { dispatchAuth, getUser, hashPassword } from './useLogin';

const createSalt = async (rounds: number = 12): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
};

export const setSalt = async (setError: SetErrorFn, formData: any) => {
  try {
    const salt = await createSalt();

    if (salt) {
      return { loginData: hashPassword(formData, salt), salt: { salt } };
    } else {
      return {
        loginData: {
          username: formData.username,
          password: formData.password,
        },
        salt: null,
      };
    }
  } catch (error) {
    setError(error);
  }
};

export const postUser = (formData: any): Promise<any> => {
  return axios.post<any>(`/auth/register/`, formData);
};

export const useRegister = async (
  formData: any,
  dispatch: Dispatch,
  navigate: any,
  setError: SetErrorFn
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
    dispatchAuth(response, dispatch);

    const expires = new Date(Date.parse(response.data.exp));
    Cookies.set('jwt', response.data.jwt, { expires });
    Cookies.set('username', formData.username, { expires: 90 });

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
