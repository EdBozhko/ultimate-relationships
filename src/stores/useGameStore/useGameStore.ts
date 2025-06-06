'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { GameStore } from './useGameStore.types.ts';

const useChatStore = create<GameStore>()(
  persist(
    (set) => {
      return {
        _hasHydrated: false,
        setHasHydrated: (state) => {
          set({
            _hasHydrated: state,
          });
        },

        isBraVisible: true,
        toggleBraVisible: () => {
          set((prev) => {
            return { isBraVisible: !prev.isBraVisible };
          });
        },

        isCorsetVisible: true,
        toggleCorsetVisible: () => {
          set((prev) => {
            return { isCorsetVisible: !prev.isCorsetVisible };
          });
        },

        isPantiesVisible: true,
        togglePantiesVisible: () => {
          set((prev) => {
            return { isPantiesVisible: !prev.isPantiesVisible };
          });
        },

        isSkirtVisible: true,
        toggleSkirtVisible: () => {
          set((prev) => {
            return { isSkirtVisible: !prev.isSkirtVisible };
          });
        },

        isThighStrapsVisible: true,
        toggleThighStrapsVisible: () => {
          set((prev) => {
            return { isThighStrapsVisible: !prev.isThighStrapsVisible };
          });
        },
      };
    },
    {
      name: 'game-store',
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);

export default useChatStore;
