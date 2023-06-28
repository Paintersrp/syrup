
import { create } from 'zustand';

const initialAuthState = {
  property: value,
};

export interface AuthState {
  property: type,
}

export interface AuthStore {
  authState: AuthState,
  authFn: (placeholder: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authState: initialAuthState,

    authFn: (placeholder) => {
      set((state) => ({
        authState: {
            ...state.authState,
            property: value,
        },
      }));
    },
}));
