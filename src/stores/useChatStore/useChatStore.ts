'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { USER_DATA } from '@src/utils';
import type { ChatStore } from './useChatStore.types.ts';

const useChatStore = create<ChatStore>()(
  persist(
    (set) => {
      return {
        messages: {},
        addMessage: (author, message) => {
          const now = new Date();

          const currentDate: string = new Intl.DateTimeFormat(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(now);

          const currentTime = new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now);

          set((state) => {
            const existingMessages = state.messages[currentDate]?.messages || [];

            return {
              messages: {
                ...state.messages,
                [currentDate]: {
                  ...state.messages[currentDate],
                  id: currentDate,
                  messages: [...existingMessages, { id: Date.now(), author, message, time: currentTime }],
                },
              },
            };
          });
        },

        userData: {
          [USER_DATA.NICK_NAME]: '',
          [USER_DATA.AI_NICK_NAME]: '',
          [USER_DATA.PREFERENCES]: [],
          [USER_DATA.TYPE_OF_CONNECTION]: '',
          [USER_DATA.CHARACTER_TEMPLATE]: '',
          [USER_DATA.TONE_TIPS]: { choiceType: 'multi' },
          [USER_DATA.TRAITS]: { choiceType: 'multi' },
        },
        updateNickName: (nickName = '') => {
          set((state) => {
            return { userData: { ...state.userData, nickName } };
          });
        },
        updateAiNickName: (aiNickName = '') => {
          set((state) => {
            return { userData: { ...state.userData, aiNickName } };
          });
        },
        updateTypeOfConnection: (typeOfConnection = '') => {
          set((state) => {
            return { userData: { ...state.userData, typeOfConnection } };
          });
        },
        updateCharacterTemplate: (characterTemplate = '') => {
          set((state) => {
            return { userData: { ...state.userData, characterTemplate } };
          });
        },
        updateToneTips: (toneTips) => {
          set((state) => {
            return { userData: { ...state.userData, toneTips } };
          });
        },
        updateTraits: (traits) => {
          set((state) => {
            return { userData: { ...state.userData, traits } };
          });
        },
        updatePreferences: (preferences = []) => {
          set((state) => {
            return { userData: { ...state.userData, preferences } };
          });
        },
      };
    },
    {
      name: 'chat-store',
    },
  ),
);

export default useChatStore;
