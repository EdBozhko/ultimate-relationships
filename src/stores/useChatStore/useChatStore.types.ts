import { USER_DATA } from '@src/utils';
import type { ChoiceOptions } from '@helpers/lib/characterTemplates.types';

export interface Message {
  id: number;
  author: string;
  message: string;
  time: string;
}

export interface DailyMessages {
  id: string;
  messages: Message[];
}

export interface ChatStore {
  isTypingIndicatorVisible: boolean;
  setIsTypingIndicatorVisible: (isTypingIndicatorVisible: boolean) => void;

  isAiTyping: boolean;
  setIsAiTyping: (isAiTyping: boolean) => void;

  isOptionsListVisible: boolean;
  setIsOptionsListVisible: (isOptionsListVisible: boolean) => void;

  currentMessageType: string;
  setCurrentMessageType: (currentMessageType: string) => void;

  textAreaValue: string;
  setTextAreaValue: (textAreaValue: string) => void;

  isSubmitButtonDisabled: boolean;
  setIsSubmitButtonDisabled: (isSubmitButtonDisabled: boolean) => void;

  isTextareaDisabled: boolean;
  setIsTextareaDisabled: (isTextareaDisabled: boolean) => void;

  answerOptions: ChoiceOptions;
  setAnswerOptions: (answerOptions: ChoiceOptions) => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  isChatting: boolean;
  setIsChatting: (isChatting: boolean) => void;

  currentAiMessageIndex: number;
  setCurrentAiMessageIndex: () => void;

  messages: Record<string, DailyMessages>;
  addMessage: (author: string, message: string) => void;

  userData: {
    [USER_DATA.NICK_NAME]: string;
    [USER_DATA.AI_NICK_NAME]: string;
    [USER_DATA.TYPE_OF_CONNECTION]: string;
    [USER_DATA.PREFERENCES]: string[];
    [USER_DATA.CHARACTER_TEMPLATE]: string;
    [USER_DATA.TONE_TIPS]: ChoiceOptions;
    [USER_DATA.TRAITS]: ChoiceOptions;
  };
  updateNickName: (nickName: string) => void;
  updateAiNickName: (aiNickName: string) => void;
  updateTypeOfConnection: (typeOfConnection: string) => void;
  updateCharacterTemplate: (characterTemplate: string) => void;
  updateToneTips: (toneTips: ChoiceOptions) => void;
  updateTraits: (traits: ChoiceOptions) => void;
  updatePreferences: (preferences: string[]) => void;
}
