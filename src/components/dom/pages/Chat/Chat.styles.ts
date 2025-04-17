import TextareaAutosize from 'react-textarea-autosize';
import styled, { css, keyframes } from 'styled-components';
import ArrowUp from '@public/icons/arrow-up.svg';

const wave = keyframes`
  0% {
      transform: translateY(0px);
      background: rgba(194, 149, 192, 0);
  }
  50% {
      transform: translateY(-5rem);
      background: rgba(194, 149, 192, 0.8);
  }
  100% {
      transform: translateY(0px);
      background: rgba(194, 149, 192, 0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  max-width: 100%;
`;

export const Display = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  padding: 35rem 16rem 0 16rem;
`;

export const MessagesLists = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  font: inherit;
  font-size: 14rem;
  color: #f0ffff;
`;

export const MessagesListsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const MessagesListDate = styled.span`
  margin: 0 0 10rem 0;
  border-radius: 100rem;
  padding: 5rem 7rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: sticky;
  top: -1px;
  opacity: 0.8;
  font-size: 11rem;
  z-index: 1;
`;

export const MessagesList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 10rem 0;
`;

export const Message = styled.p`
  margin: 0 0 5rem 0;
`;

export const MessagesListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 0 0 10rem 0;
  padding: 0 15% 0 0;

  ${Message} {
    border-radius: 10rem;
    padding: 7rem;
    border: 1px solid #c295c0;
    box-shadow:
      0 0 7px #c295c0,
      0 0 10px #c295c0,
      0 0 42px #c300b6;
  }
`;

export const MessagesListItemOwn = styled(MessagesListItem)`
  align-items: flex-end;
  padding: 0 0 0 15%;

  ${Message} {
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

export const MessageTime = styled.span`
  font-size: 10rem;
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex: 0 1 auto;
  align-items: flex-end;
  background-color: transparent;
  padding: 0 16rem 16rem 16rem;

  border-radius: 10rem;
  margin: 16rem 0 0 0;
`;

export const TextareaContainer = styled.div`
  flex: 1 1 auto;
  border-radius: 10rem;
  padding: 7rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const Textarea = styled(TextareaAutosize)`
  font-size: 20rem;
  line-height: 1.2;
  outline: none;
  resize: none;
  color: #f0ffff;
  width: 100%;
  height: auto;
  background-color: transparent;

  &::placeholder {
    color: #656565;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 40rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #ffffff;
  margin: 0 0 0 10rem;
  transition: transform 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(${ArrowUp});
  }

  &:disabled {
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const OptionsList = styled(TextareaContainer).attrs({ as: 'ul' })`
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const OptionsListItem = styled.li`
  display: flex;
`;

export const OptionsButton = styled.label`
  /* margin: 0 0 5rem 0; */
  font: inherit;
  font-size: 12rem;
  color: #f0ffff;

  border-radius: 6rem;
  padding: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
`;

export const OptionsInput = styled.input`
  display: none;

  &:checked + ${OptionsButton} {
    ${({ $checkedColor }) =>
      $checkedColor &&
      css`
        border: 1px solid ${$checkedColor};
        box-shadow:
          0 0 7px ${$checkedColor},
          0 0 10px ${$checkedColor};

        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      `}
  }
`;

export const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  max-width: fit-content;

  position: relative;

  border-radius: 100rem;
  padding: 10rem;
  margin: 0 0 10rem 0;
  border: 1px solid #c295c0;
  box-shadow:
    0 0 7px #c295c0,
    0 0 10px #c295c0,
    0 0 42px #c300b6;
`;

export const TypingIndicatorDot = styled.div`
  border-radius: 9999px;
  height: 5rem;
  width: 5rem;
  will-change: transform;

  background: rgba(194, 149, 192, 1);
  animation: ${wave} 1s infinite;

  &:nth-child(1) {
    animation-delay: 0.3333s;
  }
  &:nth-child(2) {
    animation-delay: 0.6666s;
  }
  &:nth-child(3) {
    animation-delay: 0.9999s;
  }
`;
