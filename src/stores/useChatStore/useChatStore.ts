'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { USER_DATA } from '@src/utils';
import type { ChatStore } from './useChatStore.types.ts';

const useChatStore = create<ChatStore>()(
  persist(
    (set) => {
      return {
        isTypingIndicatorVisible: false,
        setIsTypingIndicatorVisible: (isTypingIndicatorVisible) => {
          set(() => {
            return { isTypingIndicatorVisible: isTypingIndicatorVisible };
          });
        },

        isAiTyping: false,
        setIsAiTyping: (isAiTyping) => {
          set(() => {
            return { isAiTyping: isAiTyping };
          });
        },

        isOptionsListVisible: false,
        setIsOptionsListVisible: (isOptionsListVisible) => {
          set(() => {
            return { isOptionsListVisible: isOptionsListVisible };
          });
        },

        currentMessageType: '',
        setCurrentMessageType: (currentMessageType) => {
          set(() => {
            return { currentMessageType: currentMessageType };
          });
        },
        textAreaValue: '',
        setTextAreaValue: (textAreaValue) => {
          set(() => {
            return { textAreaValue: textAreaValue };
          });
        },
        isSubmitButtonDisabled: true,
        setIsSubmitButtonDisabled: (isSubmitButtonDisabled) => {
          set(() => {
            return { isSubmitButtonDisabled: isSubmitButtonDisabled };
          });
        },
        isTextareaDisabled: true,
        setIsTextareaDisabled: (isTextareaDisabled) => {
          set(() => {
            return { isTextareaDisabled: isTextareaDisabled };
          });
        },
        answerOptions: { choiceType: 'single', options: [] },
        setAnswerOptions: (answerOptions) => {
          set(() => {
            return { answerOptions: answerOptions };
          });
        },

        _hasHydrated: false,
        setHasHydrated: (state) => {
          set({
            _hasHydrated: state,
          });
        },

        currentAiMessageIndex: 0,
        setCurrentAiMessageIndex: () => {
          set((state) => {
            return { currentAiMessageIndex: state.currentAiMessageIndex + 1 };
          });
        },

        isChatting: false,
        setIsChatting: (isChatting) => {
          set(() => {
            return { isChatting: isChatting };
          });
        },

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
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    },
  ),
);

export default useChatStore;
