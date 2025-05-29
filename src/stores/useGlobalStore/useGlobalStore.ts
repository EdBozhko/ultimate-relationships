'use client';

import { create } from 'zustand';
import type { GlobalStore } from './useGlobalStore.types.ts';

const useGlobalStore = create<GlobalStore>((set) => {
  return {
    isHeaderVisible: false,
    showHeader: () => {
      set(() => {
        return { isHeaderVisible: true };
      });
    },
    hideHeader: () => {
      set(() => {
        return { isHeaderVisible: false };
      });
    },

    isAdditionalMenuOpened: false,
    closeAdditionalMenu: () => {
      set(() => {
        return { isAdditionalMenuOpened: false };
      });
    },
    openAdditionalMenu: () => {
      set(() => {
        return { isAdditionalMenuOpened: true };
      });
    },
    toggleAdditionalMenu: () => {
      set((prev) => {
        return { isAdditionalMenuOpened: !prev.isAdditionalMenuOpened };
      });
    },

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

    isDebugPerfMode: true,
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
