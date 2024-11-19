/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useInitialModal = create((set) => ({
  isOpen: false,
  toggleModal: () => set((state:any) => ({ isOpen: !state.isOpen })),
}));
