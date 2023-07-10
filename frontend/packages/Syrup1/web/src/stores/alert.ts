import { create } from 'zustand';

const initialAlertState = {
  open: false,
  message: undefined,
  type: undefined,
  errorMessage: '',
  duration: 5000,
};

export interface AlertState {
  open: boolean;
  message: string | undefined;
  type: AlertOptions;
  errorMessage: string;
  duration: number;
}

export type AlertOptions = 'success' | 'error' | 'warning' | 'info' | undefined;

export interface AlertStore {
  alertState: AlertState;
  showAlert: (type: AlertOptions, message: string, duration?: number) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alertState: initialAlertState,

  showAlert: (type, message, duration = 5000) => {
    set((state) => ({
      alertState: {
        ...state.alertState,
        open: true,
        type,
        message,
        duration,
      },
    }));
  },

  closeAlert: () => {
    set((state) => ({
      alertState: {
        ...state.alertState,
        open: false,
        message: '',
        type: undefined,
      },
    }));
  },
}));
