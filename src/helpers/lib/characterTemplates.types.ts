export interface ChoiceOptions {
  choiceType: 'single' | 'multi';
  options?: string[];
}

export type CharacterTemplate = {
  name: string;
  systemPrompt: string;
  traits: ChoiceOptions;
  tone: ChoiceOptions;
  emojis: string[];
};

export type CharacterTemplates = Record<string, CharacterTemplate>;
