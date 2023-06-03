import {
  SetAuthAction,
  SetUserAction,
  SET_AUTH,
  SET_USER,
} from "../actions/auth";

export interface AuthState {
  is_authenticated: any;
  is_superuser: boolean;
  is_checked: boolean;
  username: string;
}

const initialState: AuthState = {
  is_authenticated: false,
  is_superuser: false,
  is_checked: false,
  username: "",
};

type AuthActionTypes = SetAuthAction | SetUserAction | any;

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        is_authenticated: action.payload.is_authenticated,
        is_checked: true,
      };
    case SET_USER:
      return {
        ...state,
        is_superuser: action.payload.is_superuser,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default authReducer;
