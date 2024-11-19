/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useMembersModal = create((set) => ({
  isMembersOpen: false,
  toggleMembersModal: () => set((state:any) => ({ isMembersOpen: !state.isMembersOpen })),
}));
