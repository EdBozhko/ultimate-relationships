import type { FC } from 'react';
import type { USER_DATA } from '@src/utils';
import type { ChoiceOptions } from '@helpers/lib/characterTemplates.types';

export type ChatComponent = FC;

export interface AiMessage {
  message: string;
  type: (typeof USER_DATA)[keyof typeof USER_DATA];
  answerOptions?: ChoiceOptions;
}
export type AiMessages = AiMessage[];

export interface OptionsInputProps {
  $checkedColor: string;
}
