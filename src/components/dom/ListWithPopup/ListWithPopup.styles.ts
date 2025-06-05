'use client';

import styled, { css } from 'styled-components';
import Image from 'next/image';
import { ThreeDimensionalButton } from '../ThreeDimensionalButton/ThreeDimensionalButton.tsx';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import { animated } from '@react-spring/web';

import type { ListItemProps } from './ListWithPopup.types.ts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 0 16rem 0;

  @media ${SCREENS.fullHd} {
    padding: 0 20%;
  }
`;

export const List = styled.ul`
  margin: 16rem 0 0 0;
  display: flex;
  flex-wrap: wrap;
  flex-basis: auto;
  padding: 0 16rem 0 16rem;
  width: 100%;
  overflow-y: auto;
  align-items: flex-start;
`;

export const ListItem = styled.li<ListItemProps>`
  display: flex;

  padding-bottom: 20rem;
  ${({ $itemsPerRow, $itemsOrientation }) => {
    switch ($itemsPerRow) {
      case 1:
        return css`
          width: 100%;
          aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};
        `;
      case 2:
        return css`
          width: 50%;
          aspect-ratio: 1 / 1.5;
          aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};

          &:nth-child(odd) {
            padding-right: 10rem;
          }

          &:nth-child(even) {
            padding-left: 10rem;
          }
        `;

      case 3:
        return css`
          width: 33.33%;
          aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};

          &:nth-child(3n-2) {
            padding-right: 10rem;
          }

          &:nth-child(3n-1) {
            padding-right: 10rem;
            padding-left: 10rem;
          }

          &:nth-child(3n) {
            padding-left: 10rem;
          }
        `;

      default:
        return css`
          width: 100%;
          aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};
        `;
    }
  }}

  @media ${SCREENS.fullHd} {
    padding-bottom: 40rem;
    ${({ $itemsPerRow, $itemsOrientation }) => {
      switch ($itemsPerRow) {
        case 1:
          return css`
            width: 100%;
            aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};
          `;
        case 2:
          return css`
            width: 50%;
            aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};

            &:nth-child(odd) {
              padding-right: 20rem;
            }

            &:nth-child(even) {
              padding-left: 20rem;
            }
          `;

        case 3:
          return css`
            width: 33.33%;
            aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};

            &:nth-child(3n-2) {
              padding-right: 20rem;
            }

            &:nth-child(3n-1) {
              padding-right: 20rem;
              padding-left: 20rem;
            }

            &:nth-child(3n) {
              padding-left: 20rem;
            }
          `;

        default:
          return css`
            width: 100%;
            aspect-ratio: ${$itemsOrientation === 'hor' ? 1.5 / 1 : 1 / 1.5};
          `;
      }
    }}
  }
`;

export const ListItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  cursor: pointer;

  border-radius: 5rem;
  padding: 5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: transform 0.25s ease;

  &:active {
    transform: scale(0.9);
  }

  @media ${SCREENS.fullHd} {
    border-radius: 20rem;
  }
`;

export const ListItemImageContainer = styled.div`
  border-radius: 10rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ListItemName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font: inherit;
  font-size: 16rem;
  color: #f0ffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 30%;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;

  text-transform: uppercase;

  border-radius: 10rem 10rem 0 0;
  padding: 7rem;
  background: linear-gradient(135deg, rgba(30, 31, 37, 0.2), rgba(42, 43, 52, 0));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media ${SCREENS.fullHd} {
    border-radius: 20rem;
    font-size: 40rem;
  }
`;

export const ListItemImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const AnimatedBackgroundWrapper = styled(animated.div)`
  display: flex;
  overflow-y: auto;
  width: 100%;
`;

export const AnimatedPopup = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
  position: fixed;
  left: 2vw;
  height: calc(100vh + 10%); // 100px for bouncing animation
  width: 96vw;
  border-radius: 12px 12px 0px;
  background: #fff;
  touch-action: none;

  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10rem;
  padding: 7rem;
  background: linear-gradient(135deg, rgba(30, 31, 37, 0.2), rgba(42, 43, 52, 0));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media ${SCREENS.fullHd} {
    width: 50vw;
    left: 25vw;
    padding: 30rem;
    border-radius: 20rem;
  }
`;

export const AnimatedPopupClose = styled.button`
  width: 40rem;
  height: 4rem;
  min-height: 4rem;
  border-radius: 10rem;
  background-color: rgba(42, 43, 52, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media ${SCREENS.fullHd} {
    width: 80rem;
    height: 8rem;
    min-height: 8rem;
    border-radius: 20rem;
  }
`;

export const AnimatedPopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 10rem 0 0 0;
`;

export const AnimatedPopupDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 1 auto;
  width: 100%;

  overflow-y: auto;
`;

export const AnimatedPopupDescriptionTitle = styled.p`
  color: #8de3fc;
  font-size: 20rem;
  margin: 10rem 0 0 0;

  span {
    text-transform: uppercase;
    font-weight: 300;
    color: #ffffff;
  }

  @media ${SCREENS.fullHd} {
    font-size: 36rem;
  }
`;

export const AnimatedPopupDescription = styled.p`
  color: #8de3fc;
  font-size: 16rem;
  margin: 10rem 0 0 0;

  span {
    font-weight: 300;
    color: #ffffff;
  }

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
  }
`;

export const AnimatedPopupDescriptionImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
`;

export const AnimatedPopupDescriptionImage = styled(Image)`
  object-fit: contain;
`;

export const AnimatedPopupButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding: 7rem 0 0 0;

  @media ${SCREENS.fullHd} {
    gap: 10rem;
    padding: 15rem 0 0 0;
  }
`;

export const AnimatedPopupButton = styled(ThreeDimensionalButton)`
  flex: 1 1 30%;
  max-width: 400rem;

  &:not(:first-child) {
    margin: 0;
  }
`;
