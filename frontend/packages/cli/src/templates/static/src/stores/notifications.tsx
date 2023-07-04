import { create } from 'zustand';

const initialNotificationsState = {
  property: value,
};

export interface NotificationsState {
  property: type;
}

export interface NotificationsStore {
  undefinedState: NotificationsState;
  undefinedFn: (placeholder: any) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  undefinedState: initialNotificationsState,

  undefinedFn: (placeholder) => {
    set((state) => ({
      undefinedState: {
        ...state.undefinedState,
        property: value,
      },
    }));
  },
}));
