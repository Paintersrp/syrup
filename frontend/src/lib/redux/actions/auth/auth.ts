export const SET_AUTH = "SET_AUTH";
export const SET_USER = "SET_USER";

export interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: any;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: any;
}

export const setAuth = (isAuth: any): SetAuthAction => {
  return {
    type: SET_AUTH,
    payload: isAuth,
  };
};

export const setUser = (isUser: any): SetUserAction => {
  return {
    type: SET_USER,
    payload: isUser,
  };
};
