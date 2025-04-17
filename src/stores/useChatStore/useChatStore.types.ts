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
