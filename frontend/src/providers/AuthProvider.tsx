import { useEffect, createContext, ReactNode, useContext, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import { axios, handleAuth, handleClearAuth } from '@/lib';

export const AuthContext = createContext<any>({
  is_authenticated: false,
  is_superuser: false,
  is_checked: false,
  username: '',
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get('jwt')) {
      axios
        .get('auth/verify/')
        .then((res) => {
          handleAuth(res, dispatch);
          if (res.data.refreshed_token) {
            Cookies.remove('jwt');
            const expires = new Date(Date.parse(res.data.exp));
            Cookies.set('jwt', res.data.refreshed_token, { expires });
          }
        })
        .catch((err) => {
          handleClearAuth(dispatch);
        });
    } else {
      handleClearAuth(dispatch);
    }
  }, [dispatch]);

  const auth: any = useSelector<any>((state) => state.auth);

  return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
