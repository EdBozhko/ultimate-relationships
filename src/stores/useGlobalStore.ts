'use client';

import { create } from 'zustand';
import type { GlobalStore } from './useGlobalStore.types.ts';

const useGlobalStore = create<GlobalStore>((set) => {
  return {
    isDebugMode: false,
    debugMode: () => {
      set(() => {
        return { isDebugMode: true };
      });
    },
    userMode: () => {
      set(() => {
        return { isDebugMode: false };
      });
    },
    isDebugPerfMode: false,
    debugPerfMode: () => {
      set(() => {
        return { isDebugPerfMode: true };
      });
    },
    userPerfMode: () => {
      set(() => {
        return { isDebugPerfMode: false };
      });
    },
  };
});

export default useGlobalStore;
