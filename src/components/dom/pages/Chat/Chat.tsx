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
import useChatStore from '@src/stores/useChatStore/';
import { characterTemplates } from '@helpers/lib/characterTemplates.ts';
import { USER_DATA } from '@src/utils';
import { AudioVisualizer } from '@comp/dom/AudioVisualizer';

import { ClientPortal } from '@comp/dom/ClientPortal/ClientPortal.tsx';
import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { MouseEvent } from 'react';
import type { ChatComponent, AiMessages, AiMessage } from './Chat.types.ts';

const ChatView = dynamic(() => import('@comp/canvas/ChatView/ChatView.tsx').then((mod) => mod.ChatView), {
  ssr: false,
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
  {
    message: `Hey, handsome!😘 What's your name?)`,
    type: USER_DATA.NICK_NAME,
    audio: {
      src: '/audio/hey_handsome_whats_your_name.wav',
    },
  },
  {
    message: `Do you want me to be your lover or friend?😇`,
    type: USER_DATA.TYPE_OF_CONNECTION,
    audio: {
      src: '/audio/do_you_want_me_to_be_your_lover_or_friend.wav',
    },
    answerOptions: {
      options: ['lover', 'friend'],
      choiceType: 'single',
    },
  },
  {
    message: `And who do you prefer?`,
    type: USER_DATA.PREFERENCES,
    audio: {
      src: '/audio/and_who_do_you_prefer.wav',
    },
    answerOptions: {
      options: ['female', 'male', 'transgender', 'femboy'],
      choiceType: 'multi',
    },
  },
  {
    message: `How would you like to call me?`,
    type: USER_DATA.AI_NICK_NAME,
    audio: {
      src: '/audio/how_would_you_like_to_call_me.wav',
    },
  },
  {
    message: `What like do you want me to be for you?😊`,
    type: USER_DATA.CHARACTER_TEMPLATE,
    audio: {
      src: '/audio/what_like_do_you_want_me_to_be_for_you.wav',
    },
    answerOptions: {
      options: Object.keys(characterTemplates),
      choiceType: 'single',
    },
  },
  {
    message: `Choose for me some tone tips`,
    type: USER_DATA.TONE_TIPS,
    audio: {
      src: '/audio/choose_for_me_some_tone_tips.wav',
    },
    answerOptions: {
      choiceType: 'single',
    },
  },
  {
    message: `And some traits)`,
    type: USER_DATA.TRAITS,
    audio: {
      src: '/audio/and_some_traits.wav',
    },
    answerOptions: {
      choiceType: 'single',
    },
  },
  {
    message: `Now I'm here for you!💖`,
    type: USER_DATA.SUCCESS,
    audio: {
      src: '/audio/now_im_here_for_you.wav',
    },
  },
];

export const Chat: ChatComponent = () => {
  const audioRef = useRef<HTMLAudioElement>(null!);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showRestrictedPopUp, setRestrictedShowPopUp] = useState(false);

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
  const currentAiMessageIndex = useChatStore((store) => store.currentAiMessageIndex);
  const setCurrentAiMessageIndex = useChatStore((store) => store.setCurrentAiMessageIndex);
  const isChatting = useChatStore((store) => store.isChatting);
  const setIsChatting = useChatStore((store) => store.setIsChatting);
  const hasHydrated = useChatStore((store) => store._hasHydrated);

  const isTypingIndicatorVisible = useChatStore((store) => store.isTypingIndicatorVisible);
  const setIsTypingIndicatorVisible = useChatStore((store) => store.setIsTypingIndicatorVisible);

  const isAiTyping = useChatStore((store) => store.isAiTyping);
  const setIsAiTyping = useChatStore((store) => store.setIsAiTyping);

  const isOptionsListVisible = useChatStore((store) => store.isOptionsListVisible);
  const setIsOptionsListVisible = useChatStore((store) => store.setIsOptionsListVisible);

  const currentMessageType = useChatStore((store) => store.currentMessageType);
  const setCurrentMessageType = useChatStore((store) => store.setCurrentMessageType);

  const textAreaValue = useChatStore((store) => store.textAreaValue);
  const setTextAreaValue = useChatStore((store) => store.setTextAreaValue);

  const isSubmitButtonDisabled = useChatStore((store) => store.isSubmitButtonDisabled);
  const setIsSubmitButtonDisabled = useChatStore((store) => store.setIsSubmitButtonDisabled);

  const isTextareaDisabled = useChatStore((store) => store.isTextareaDisabled);
  const setIsTextareaDisabled = useChatStore((store) => store.setIsTextareaDisabled);

  const answerOptions = useChatStore((store) => store.answerOptions);
  const setAnswerOptions = useChatStore((store) => store.setAnswerOptions);

  const displayRef = useRef<HTMLDivElement | null>(null);

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
      if (isAiTyping) {
        setIsPlaying(false);

        setIsSubmitButtonDisabled(true);
        setIsTextareaDisabled(true);
      }
      setCurrentMessageType(messageData.type);

      const aIStartTypingTimeout = setTimeout(() => {
        setIsTypingIndicatorVisible(true);
        if (messageData.audio?.src) {
          audioRef.current.src = messageData.audio.src;
          audioRef.current.load();
        }
      }, 500);

      const timeout = setTimeout(() => {
        if (messageData.audio?.src) {
          audioRef.current.play();
          setIsPlaying(true);
        }
        setIsTypingIndicatorVisible(false);
        setIsAiTyping(false);
        addMessage('ai', messageData.message);
        setIsSubmitButtonDisabled(false);
        setIsTextareaDisabled(false);

        if (currentAiMessageIndex < AI_MESSAGES.length - 1) {
          setCurrentAiMessageIndex();
        } else {
          setIsSubmitButtonDisabled(true);
          setIsTextareaDisabled(true);
          setRestrictedShowPopUp(true);
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

        if (!isChatting) {
          setIsChatting(true);
        }
      }, timeoutInMs + 500);

      return { timeout, aIStartTypingTimeout };
    },
    [currentAiMessageIndex, characterTemplate, addMessage],
  );

  useEffect(() => {
    if (hasHydrated && isChatting) return;

    const { timeout, aIStartTypingTimeout } = aiTypingIndicatorTimeout(AI_MESSAGES[currentAiMessageIndex], 2000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(aIStartTypingTimeout);
    };
  }, [hasHydrated]);

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
        <audio ref={audioRef} />
        <AudioVisualizer isPlaying={isPlaying} audio={audioRef} />
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
        <ClientPortal selector='client-portal' show={showRestrictedPopUp}>
          <RestrictedPopup
            onClosePopupClick={useCallback(() => setRestrictedShowPopUp(false), [showRestrictedPopUp])}
          />
        </ClientPortal>
      </Container>
    </>
  );
};
