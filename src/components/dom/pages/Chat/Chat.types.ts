import type { FC } from 'react';
import type { ChoiceOptions } from '@helpers/lib/characterTemplates.types';

export type ChatComponent = FC;

export interface AiMessage {
  message: string;
  type: string;
  answerOptions?: ChoiceOptions;
}
export type AiMessages = AiMessage[];
