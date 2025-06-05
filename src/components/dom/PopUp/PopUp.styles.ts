import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import type { PopUpContainerProps, PopUpContentProps, PopUpLinkProps } from './PopUp.types.ts';

const popupContentIn = keyframes`
  from {
    max-height: 0rem;
  }

  to {
    max-height: 100vh;
  }
`;

const popupIn = keyframes`
  0% {
    padding: 0 16rem;
    border-width: 2rem;
    transform: translate(-200%, -50%);
  }

  30% {
    padding: 0 16rem;
    border-width: 2rem;
    transform: translate(-50%, -50%);
  }

  50% {
    padding: 0 16rem;
    border-width: 2rem;
    transform: translate(-50%, -50%);
  }

  100% {
    padding: 16rem;
    border-width: 5rem;
    transform: translate(-50%, -50%);  
  }
`;

const popupInFullHd = keyframes`
  0% {
    padding: 0 32rem;
    border-width: 4rem;
    transform: translate(-200%, -50%);
  }

  30% {
    padding: 0 32rem;
    border-width: 4rem;
    transform: translate(-50%, -50%);
  }

  50% {
    padding: 0 32rem;
    border-width: 4rem;
    transform: translate(-50%, -50%);
  }

  100% {
    padding: 32rem;
    border-width: 10rem;
    transform: translate(-50%, -50%);  
  }
`;

export const PopUpContent = styled.div<PopUpContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;

  ${({ $show }) =>
    !$show &&
    css`
      max-height: 0rem;
    `}

  ${({ $show }) =>
    $show &&
    css`
      animation: ${popupContentIn} 1s linear;
      animation-delay: 1s;
      animation-fill-mode: both;
    `}
`;

export const PopUpContainer = styled.div<PopUpContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 576rem;
  padding: 16rem;
  background: linear-gradient(180deg, rgba(0, 0, 60, 1) 0%, rgba(0, 0, 60, 1) 100%);
  border-radius: 20rem;
  box-shadow:
    0 0 15rem rgba(255, 0, 150, 0.8),
    0 0 30rem rgba(255, 0, 150, 0.6),
    0 0 60rem rgba(255, 0, 150, 0.4),
    inset 0 0 50rem rgba(0, 173, 255, 0.5),
    inset 0 0 140rem rgba(255, 50, 200, 0.4);
  border: 5rem solid rgba(255, 0, 150, 0.5);
  will-change: transform, padding, border-width;

  &::before {
    content: '';
    position: absolute;
    top: -5rem;
    left: -5rem;
    right: -5rem;
    bottom: -5rem;
    border-radius: 25rem;
    z-index: -1;
    opacity: 0.8;
  }

  ${({ $show }) =>
    !$show &&
    css`
      padding: 0;
      border-width: 2rem;
      transform: translate(-200%, -50%);
    `}

  ${({ $show }) =>
    $show &&
    css`
      animation: ${popupIn} 2s linear;
      animation-fill-mode: both;

      @media ${SCREENS.fullHd} {
        animation: ${popupInFullHd} 2s linear;
        animation-fill-mode: both;
      }
    `}
`;

export const PopUpTitle = styled.p`
  color: #d8acff;
  font: inherit;
  font-size: 20rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 10rem 0;
  padding: 0;

  @media ${SCREENS.fullHd} {
    font-size: 36rem;
    margin: 0 0 20rem 0;
  }
`;

export const PopUpText = styled.p`
  color: #c686ff;
  font: inherit;
  font-size: 16rem;
  font-weight: 300;
  text-align: center;
  margin: 0 0 10rem 0;
  padding: 0;

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
    margin: 0 0 20rem 0;
  }
`;

export const PopUpButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PopUpButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d8acff;
  width: 300rem;
  max-width: 100%;
  text-align: center;
  font-size: 16rem;
  padding: 14rem 10rem;
  background-color: #d334e3;
  border-radius: 200rem;

  &:not(:first-child) {
    margin: 10rem 0 0 0;
  }

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
    padding: 20rem 15rem;
    width: 400rem;

    &:not(:first-child) {
      margin: 15rem 0 0 0;
    }
  }
`;

export const PopUpLink = styled(Link)<PopUpLinkProps>`
  ${PopUpButtonCss}
`;

export const PopUpButton = styled.button`
  ${PopUpButtonCss}
`;
