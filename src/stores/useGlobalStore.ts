'use client';

import { create } from 'zustand';

export default create((set) => {
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
