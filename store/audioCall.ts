/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useAudioCall = create((set) => ({
  isAudioCall: false,
  toggleAudioCall: () => set((state:any) => ({ isAudioCall: !state.isAudioCall })),
}));
