/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useVideoCall = create((set) => ({
  isVideoCall: false,
  toggleVideoCall: () => set((state:any) => ({ isVideoCall: !state.isVideoCall })),
}));
