import { create } from 'zustand';

interface EditModeState {
  editMode: boolean;
  editModeToggle: () => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
  editMode: false,
  editModeToggle: () => set((state) => ({ editMode: !state.editMode })),
}));
