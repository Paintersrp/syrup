import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { axios, handleAuth, handleClearAuth } from '@/lib';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const HOC: React.FC<P> = (props) => {
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

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default WithAuth;
