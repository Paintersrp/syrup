import { useEffect, createContext, ReactNode, useContext, FC } from 'react';
import Cookies from 'js-cookie';

import { axios } from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';

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
  const { authState, handleAuth, handleClearAuth } = useAuthStore();

  useEffect(() => {
    if (Cookies.get('jwt')) {
      axios
        .get('auth/verify/')
        .then((res) => {
          handleAuth(res);
        })
        .catch((err) => {
          handleClearAuth();
        });
    } else {
      handleClearAuth();
    }
  }, []);

  return <AuthContext.Provider value={{ authState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
