import Cookies from 'js-cookie';
import { create } from 'zustand';

const initialAuthState = {
  is_authenticated: false,
  is_superuser: false,
  is_checked: false,
  username: '',
};

export interface AuthState {
  is_authenticated: any;
  is_superuser: boolean;
  is_checked: boolean;
  username: string;
}

export interface AuthResponseData {
  data: {
    authenticated: boolean;
    is_superuser: boolean;
    username: string;
    refreshed_token?: string;
    exp: string;
  };
}

export interface AuthStore {
  authState: AuthState;
  handleAuth: (res: AuthResponseData) => void;
  handleClearAuth: () => void;
}

/**
 * Creates and initializes the authentication store.
 * @param set The function to set the state of the store.
 * @returns The authentication store.
 * @example
 * console.log(authStore.authState);
 * // { is_authenticated: true, is_superuser: true, is_checked: true, username: 'john_doe' }
 */
export const useAuthStore = create<AuthStore>((set) => ({
  authState: initialAuthState,

  /**
   * Handles the authentication response and updates the state accordingly.
   * @param response The authentication response data.
   */
  handleAuth: (response) => {
    set(() => ({
      authState: {
        is_authenticated: response.data.authenticated,
        is_checked: true,
        is_superuser: response.data.is_superuser,
        username: response.data.username,
      },
    }));
    if (response.data.refreshed_token) {
      Cookies.remove('jwt');
      const expires = new Date(Date.parse(response.data.exp));
      Cookies.set('jwt', response.data.refreshed_token, { expires });
    }
  },

  /**
   * Clears the authentication state.
   */
  handleClearAuth: () => {
    set(() => ({
      authState: {
        is_authenticated: false,
        is_checked: true,
        is_superuser: false,
        username: '',
      },
    }));
  },
}));
