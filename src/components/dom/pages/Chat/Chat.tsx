'use client';

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

import type { ChatComponent, AiMessages, AiMessage } from './Chat.types.ts';
import type { ChoiceOptions } from '@helpers/lib/characterTemplates.types';

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
  { message: `Now I'm here for you!💖`, type: 'success' },
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

  const displayRef = useRef<HTMLDivElement>(null!);
  const [isTypingIndicatorVisible, setIsTypingIndicatorVisible] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentAiMessageIndex, setCurrentAiMessageIndex] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<ChoiceOptions>({ choiceType: 'single', options: [] });
  const [isOptionsListVisible, setIsOptionsListVisible] = useState(false);
  const [currentMessageType, setCurrentMessageType] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(true);

  const messagesLists = Object.keys(messages).map((messagesListsId) => {
    const curtainDateMessages = messages[messagesListsId].messages;

    const messagesList = curtainDateMessages.map(({ id, author, time, message }) => {
      return author === 'user' ? (
        <MessagesListItemOwn key={id}>
          <Message>{message}</Message>
          <MessageTime>{time}</MessageTime>
        </MessagesListItemOwn>
      ) : (
        <MessagesListItem key={id}>
          <Message>{message}</Message>
          <MessageTime>{time}</MessageTime>
        </MessagesListItem>
      );
    });

    return (
      <MessagesListsItem key={messagesListsId}>
        <MessagesListDate>{messagesListsId}</MessagesListDate>
        <MessagesList>{messagesList}</MessagesList>
      </MessagesListsItem>
    );
  });

  const onAnswerOptionClick = (event) => {
    const choiceOptions = event.target.form.elements.choiceOptions;

    if (choiceOptions) {
      const choiceOptionsChecked: string[] = [];

      switch (currentMessageType) {
        case USER_DATA.NICK_NAME:
          updateNickName(textAreaValue);

          break;

        case USER_DATA.TYPE_OF_CONNECTION:
          updateTypeOfConnection(choiceOptions.value);
          setTextAreaValue(choiceOptions.value);

          break;

        case USER_DATA.PREFERENCES:
          [...choiceOptions].forEach((choiceOption) => {
            if (choiceOption.checked) {
              choiceOptionsChecked.push(choiceOption.value);
            }
          });

          updatePreferences(choiceOptionsChecked);
          setTextAreaValue(choiceOptionsChecked.join(', '));

          break;

        case USER_DATA.AI_NICK_NAME:
          updateAiNickName(textAreaValue);

          break;

        case USER_DATA.CHARACTER_TEMPLATE:
          const characterTemplate = characterTemplates[choiceOptions.value];

          updateCharacterTemplate(choiceOptions.value);
          updateToneTips(characterTemplate.tone);
          updateTraits(characterTemplate.traits);
          setTextAreaValue(characterTemplate.name);

          break;

        case USER_DATA.TONE_TIPS:
          [...choiceOptions].forEach((choiceOption) => {
            if (choiceOption.checked) {
              choiceOptionsChecked.push(choiceOption.value);
            }
          });

          setTextAreaValue(choiceOptionsChecked.join(', '));

          break;

        case USER_DATA.TRAITS:
          [...choiceOptions].forEach((choiceOption) => {
            if (choiceOption.checked) {
              choiceOptionsChecked.push(choiceOption.value);
            }
          });

          setTextAreaValue(choiceOptionsChecked.join(', '));

          break;

        default:
          break;
      }
    }
  };

  const answerOptionsList = answerOptions.options.map((answerOption) => {
    return (
      <OptionsListItem key={answerOption}>
        <OptionsInput
          id={answerOption}
          value={answerOption}
          name='choiceOptions'
          type={answerOptions.choiceType === 'multi' ? 'checkbox' : 'radio'}
          onClick={onAnswerOptionClick}
          $checkedColor={getRandomColor()}
        />
        <OptionsButton htmlFor={answerOption}>
          {' '}
          {currentMessageType === USER_DATA.CHARACTER_TEMPLATE &&
          characterTemplates[answerOption] &&
          characterTemplates[answerOption].name
            ? characterTemplates[answerOption].name
            : answerOption}
        </OptionsButton>
      </OptionsListItem>
    );
  });

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textAreaValue.length === 0) {
      return;
    }

    addMessage('user', textAreaValue);
    setTextAreaValue('');
    setIsAiTyping(true);
    setIsOptionsListVisible(false);
  };

  const onTextareaChange = (value: string) => {
    setTextAreaValue(value);

    if (value.length > 0) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  };

  const aiTypingIndicatorTimeout = (messageData: AiMessage, timeoutInMs = 2000) => {
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

      if (currentAiMessageIndex !== AI_MESSAGES.length - 1) {
        setCurrentAiMessageIndex((prev) => prev + 1);
      } else {
        setIsSubmitButtonDisabled(true);
        setIsTextareaDisabled(true);
      }

      if (
        messageData.type === USER_DATA.TYPE_OF_CONNECTION ||
        messageData.type === USER_DATA.PREFERENCES ||
        messageData.type === USER_DATA.TRAITS ||
        messageData.type === USER_DATA.CHARACTER_TEMPLATE ||
        messageData.type === USER_DATA.TONE_TIPS ||
        messageData.type === USER_DATA.TRAITS
      ) {
        if (messageData.answerOptions?.options && Array.isArray(messageData.answerOptions.options)) {
          setAnswerOptions(messageData.answerOptions);
        } else if (messageData.type === USER_DATA.TONE_TIPS) {
          setAnswerOptions(characterTemplates[characterTemplate].tone);
        } else if (messageData.type === USER_DATA.TRAITS) {
          setAnswerOptions(characterTemplates[characterTemplate].traits);
        }

        setIsOptionsListVisible(true);
      }
    }, timeoutInMs + 500);

    return { timeout, aIStartTypingTimeout };
  };

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
  }, [isAiTyping]);

  useLayoutEffect(() => {
    displayRef.current.scrollTo(0, displayRef.current.scrollHeight);
  }, [displayRef.current?.scrollHeight, messages, isTypingIndicatorVisible]);

  return (
    <Container>
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
      <Form
        onSubmit={(event) => {
          onFormSubmit(event);
        }}
      >
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
  );
};
