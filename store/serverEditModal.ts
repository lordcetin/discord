/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useServerEdit = create((set) => ({
  isEditOpen: false,
  toggleEditModal: () => set((state:any) => ({ isEditOpen: !state.isEditOpen })),
}));
