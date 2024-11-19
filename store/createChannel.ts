/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useCreateChannel = create((set) => ({
  isCreateChannelModalOpen: false,
  toggleCreateChannelModal: () => set((state:any) => ({ isCreateChannelModalOpen: !state.isCreateChannelModalOpen })),
}));
