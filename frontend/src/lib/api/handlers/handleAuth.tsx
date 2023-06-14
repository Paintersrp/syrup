import { Dispatch } from 'redux';
import { setAuth, setUser } from '../../redux';

export interface AuthResponseData {
  data: {
    authenticated: boolean;
    is_superuser: boolean;
    username: string;
  };
}

export default function handleAuth(res: AuthResponseData, dispatch: Dispatch): void {
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
