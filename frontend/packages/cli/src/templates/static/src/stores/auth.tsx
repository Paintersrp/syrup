import { create } from 'zustand';

const initialAuthState = {
  property: value,
};

export interface AuthState {
  property: type;
}

export interface AuthStore {
  undefinedState: AuthState;
  undefinedFn: (placeholder: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  undefinedState: initialAuthState,

  undefinedFn: (placeholder) => {
    set((state) => ({
      undefinedState: {
        ...state.undefinedState,
        property: value,
      },
    }));
  },
}));
