import { axios } from '@/lib';
import Cookies from 'js-cookie';

const LogoutUser = (): void => {
  if (Cookies.get('jwt')) {
    axios
      .get('/auth/logout/')
      .then(() => {
        Cookies.remove('jwt');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.href = '/';
  }
};

export default LogoutUser;
