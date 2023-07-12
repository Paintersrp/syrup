import { create } from 'zustand';

const initialPlaceholderState = {
  property: 'value',
};

export interface PlaceholderState {
  property: any;
}

export interface PlaceholderStore {
  placeholderState: PlaceholderState;
  placeholderFn: (placeholder: any) => void;
}

export const usePlaceholderStore = create<PlaceholderStore>((set) => ({
  placeholderState: initialPlaceholderState,

  placeholderFn: (placeholder) => {
    set((state) => ({
      placeholderState: {
        ...state.placeholderState,
        property: 'value',
      },
    }));
  },
}));
