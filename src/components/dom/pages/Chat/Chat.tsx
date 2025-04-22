'use client';

import { FormEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  Container,
  Display,
  Form,
  Message,
  MessageTime,
  MessagesList,
  MessagesListItem,
  MessagesListItemOwn,
  OptionsInput,
  OptionsButton,
  OptionsList,
  OptionsListItem,
  SubmitButton,
  TextareaContainer,
  Textarea,
  MessagesListDate,
  MessagesListsItem,
  MessagesLists,
  TypingIndicatorContainer,
  TypingIndicatorDot,
} from './Chat.styles.ts';
import useChatStore from '@src/stores/useChatStore/index.ts';
import { characterTemplates } from '@helpers/lib/characterTemplates.ts';
import { USER_DATA } from '@src/utils';

import type { MouseEvent } from 'react';
import type { ChatComponent, AiMessages, AiMessage } from './Chat.types.ts';
import type { ChoiceOptions } from '@helpers/lib/characterTemplates.types';

const ChatView = dynamic(() => import('@comp/canvas/ChatView/ChatView.tsx').then((mod) => mod.ChatView), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
});

const extractCheckedOptions = (formElements: RadioNodeList): string[] => {
  return Array.from(formElements)
    .filter((el): el is HTMLInputElement => el instanceof HTMLInputElement && el.checked)
    .map((el) => el.value);
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AI_MESSAGES: AiMessages = [
  { message: `Hey, handsome!😘 What's your name?)`, type: USER_DATA.NICK_NAME },
  {
    message: `Do you want me to be your lover or friend?😇`,
    type: USER_DATA.TYPE_OF_CONNECTION,
    answerOptions: {
      options: ['lover', 'friend'],
      choiceType: 'single',
    },
  },
  {
    message: `And who do you prefer?`,
    type: USER_DATA.PREFERENCES,
    answerOptions: {
      options: ['female', 'male', 'transgender', 'femboy'],
      choiceType: 'multi',
    },
  },
  { message: `How would you like to call me?`, type: USER_DATA.AI_NICK_NAME },
  {
    message: `What like do you want me to be for you?😊`,
    type: USER_DATA.CHARACTER_TEMPLATE,
    answerOptions: {
      options: Object.keys(characterTemplates),
      choiceType: 'single',
    },
  },
  {
    message: `Choose for me some tone tips`,
    type: USER_DATA.TONE_TIPS,
    answerOptions: {
      choiceType: 'single',
    },
  },
  {
    message: `And some traits)`,
    type: USER_DATA.TRAITS,
    answerOptions: {
      choiceType: 'single',
    },
  },
  { message: `Now I'm here for you!💖`, type: USER_DATA.SUCCESS },
];

export const Chat: ChatComponent = () => {
  const messages = useChatStore((store) => store.messages);
  const addMessage = useChatStore((store) => store.addMessage);
  const characterTemplate = useChatStore((store) => store.userData.characterTemplate);

  const updateNickName = useChatStore((store) => store.updateNickName);
  const updateAiNickName = useChatStore((store) => store.updateAiNickName);
  const updateTypeOfConnection = useChatStore((store) => store.updateTypeOfConnection);
  const updateCharacterTemplate = useChatStore((store) => store.updateCharacterTemplate);
  const updateToneTips = useChatStore((store) => store.updateToneTips);
  const updateTraits = useChatStore((store) => store.updateTraits);
  const updatePreferences = useChatStore((store) => store.updatePreferences);

  const displayRef = useRef<HTMLDivElement | null>(null);
  const [isTypingIndicatorVisible, setIsTypingIndicatorVisible] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentAiMessageIndex, setCurrentAiMessageIndex] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<ChoiceOptions>({ choiceType: 'single', options: [] });
  const [isOptionsListVisible, setIsOptionsListVisible] = useState(false);
  const [currentMessageType, setCurrentMessageType] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(true);

  const onAnswerOptionClick = (event: MouseEvent<HTMLInputElement>) => {
    const form = event.currentTarget.form;
    if (!form) return;

    const choiceOptions = form.elements.namedItem('choiceOptions') as RadioNodeList | null;
    if (!choiceOptions) return;

    const choiceOptionsChecked = extractCheckedOptions(choiceOptions);
    const template = characterTemplates[choiceOptions.value];

    switch (currentMessageType) {
      case USER_DATA.NICK_NAME:
        updateNickName(textAreaValue);
        break;
      case USER_DATA.TYPE_OF_CONNECTION:
        updateTypeOfConnection(choiceOptions.value);
        setTextAreaValue(choiceOptions.value);
        break;
      case USER_DATA.PREFERENCES:
        updatePreferences(choiceOptionsChecked);
        setTextAreaValue(choiceOptionsChecked.join(', '));
        break;
      case USER_DATA.AI_NICK_NAME:
        updateAiNickName(textAreaValue);
        break;
      case USER_DATA.CHARACTER_TEMPLATE:
        updateCharacterTemplate(choiceOptions.value);
        updateToneTips(template.tone);
        updateTraits(template.traits);
        setTextAreaValue(template.name);
        break;
      case USER_DATA.TONE_TIPS:
      case USER_DATA.TRAITS:
        setTextAreaValue(choiceOptionsChecked.join(', '));
        break;
      default:
        break;
    }
  };

  const optionColors = useMemo(() => {
    const result: Record<string, string> = {};
    (answerOptions.options ?? []).forEach((option) => {
      result[option] = getRandomColor();
    });
    return result;
  }, [answerOptions.options]);

  const answerOptionsList = (answerOptions.options ?? []).map((answerOption) => {
    return (
      <OptionsListItem key={answerOption}>
        <OptionsInput
          id={answerOption}
          value={answerOption}
          name='choiceOptions'
          type={answerOptions.choiceType === 'multi' ? 'checkbox' : 'radio'}
          onClick={onAnswerOptionClick}
          $checkedColor={optionColors[answerOption]}
        />
        <OptionsButton htmlFor={answerOption}>
          {currentMessageType === USER_DATA.CHARACTER_TEMPLATE && characterTemplates[answerOption]?.name
            ? characterTemplates[answerOption].name
            : answerOption}
        </OptionsButton>
      </OptionsListItem>
    );
  });

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textAreaValue.length === 0) return;
    addMessage('user', textAreaValue);
    setTextAreaValue('');
    setIsAiTyping(true);
    setIsOptionsListVisible(false);
  };

  const onTextareaChange = (value: string) => {
    setTextAreaValue(value);
    setIsSubmitButtonDisabled(value.length === 0);
  };

  const aiTypingIndicatorTimeout = useCallback(
    (messageData: AiMessage, timeoutInMs = 2000) => {
      setIsSubmitButtonDisabled(true);
      setIsTextareaDisabled(true);
      setCurrentMessageType(messageData.type);

      const aIStartTypingTimeout = setTimeout(() => {
        setIsTypingIndicatorVisible(true);
      }, 500);

      const timeout = setTimeout(() => {
        setIsTypingIndicatorVisible(false);
        setIsAiTyping(false);
        addMessage('ai', messageData.message);
        setIsSubmitButtonDisabled(false);
        setIsTextareaDisabled(false);

        if (currentAiMessageIndex < AI_MESSAGES.length - 1) {
          setCurrentAiMessageIndex((prev) => prev + 1);
        } else {
          setIsSubmitButtonDisabled(true);
          setIsTextareaDisabled(true);
        }

        const template = characterTemplates[characterTemplate];
        if (messageData.answerOptions?.options) {
          setAnswerOptions(messageData.answerOptions);
        } else if (messageData.type === USER_DATA.TONE_TIPS) {
          setAnswerOptions(template.tone);
        } else if (messageData.type === USER_DATA.TRAITS) {
          setAnswerOptions(template.traits);
        }

        if (
          messageData.type === USER_DATA.TYPE_OF_CONNECTION ||
          messageData.type === USER_DATA.PREFERENCES ||
          messageData.type === USER_DATA.TRAITS ||
          messageData.type === USER_DATA.CHARACTER_TEMPLATE ||
          messageData.type === USER_DATA.TONE_TIPS
        ) {
          setIsOptionsListVisible(true);
        }
      }, timeoutInMs + 500);

      return { timeout, aIStartTypingTimeout };
    },
    [currentAiMessageIndex, characterTemplate, addMessage],
  );

  useEffect(() => {
    const { timeout, aIStartTypingTimeout } = aiTypingIndicatorTimeout(AI_MESSAGES[currentAiMessageIndex], 2000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(aIStartTypingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isAiTyping) return;
    const { timeout, aIStartTypingTimeout } = aiTypingIndicatorTimeout(
      AI_MESSAGES[currentAiMessageIndex],
      Math.floor(Math.random() * 4000) + 2000,
    );
    return () => {
      clearTimeout(timeout);
      clearTimeout(aIStartTypingTimeout);
    };
  }, [isAiTyping, currentAiMessageIndex, aiTypingIndicatorTimeout]);

  useLayoutEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTo(0, displayRef.current.scrollHeight);
    }
  }, [messages, isTypingIndicatorVisible]);

  const messagesLists = Object.keys(messages).map((messagesListsId) => {
    const curtainDateMessages = messages[messagesListsId].messages;
    const messagesList = curtainDateMessages.map(({ id, author, time, message }) =>
      author === 'user' ? (
        <MessagesListItemOwn key={id}>
          <Message>{message}</Message>
          <MessageTime>{time}</MessageTime>
        </MessagesListItemOwn>
      ) : (
        <MessagesListItem key={id}>
          <Message>{message}</Message>
          <MessageTime>{time}</MessageTime>
        </MessagesListItem>
      ),
    );

    return (
      <MessagesListsItem key={messagesListsId}>
        <MessagesListDate>{messagesListsId}</MessagesListDate>
        <MessagesList>{messagesList}</MessagesList>
      </MessagesListsItem>
    );
  });

  return (
    <>
      <Container>
        <ChatView />
        <Display ref={displayRef}>
          <MessagesLists>{messagesLists}</MessagesLists>
          {isTypingIndicatorVisible && (
            <TypingIndicatorContainer>
              <TypingIndicatorDot />
              <TypingIndicatorDot />
              <TypingIndicatorDot />
            </TypingIndicatorContainer>
          )}
        </Display>
        <Form onSubmit={onFormSubmit}>
          {!isOptionsListVisible && (
            <TextareaContainer>
              <Textarea
                minRows={1}
                maxRows={5}
                onChange={(event) => onTextareaChange(event.target.value)}
                placeholder='Enter your message'
                value={textAreaValue}
                disabled={isTextareaDisabled}
              />
            </TextareaContainer>
          )}
          {isOptionsListVisible && <OptionsList>{answerOptionsList}</OptionsList>}
          <SubmitButton disabled={isSubmitButtonDisabled} />
        </Form>
      </Container>
    </>
  );
};
