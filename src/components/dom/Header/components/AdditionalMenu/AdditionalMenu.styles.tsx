import styled, { css } from 'styled-components';
import Link from 'next/link';
import { SCREENS } from '@themeConfigs/constants/screen.ts';
import { NavButton } from '@comp/dom/Header/Header.styles.tsx';

import type { AdditionalMenuStyledProps } from './AdditionalMenu.types.ts';

export const AdditionalMenuStyled = styled.div<AdditionalMenuStyledProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #181818;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  bottom: 0;
  left: 0;
  padding: 16rem 16rem 80rem 16rem;
  will-change: transform;
  transform: translate(100%, 0);
  transition: transform 0.5s ease;

  ${({ $isOpened }) =>
    $isOpened &&
    css`
      transform: translate(0, 0);
    `}

  @media ${SCREENS.fullHd} {
    bottom: unset;
    left: unset;
    top: 0;
    right: 0;
    width: 30vw;
    padding: 20rem 100rem 20rem 20rem;
  }
`;

export const AdditionalMenuList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`;

export const AdditionalMenuListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 10rem 0;
`;

export const AdditionalMenuLink = styled(Link)`
  font-size: 26rem;
  color: #656565;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media ${SCREENS.fullHd} {
    font-size: 34rem;
  }
`;

export const AdditionalMenuLinkIcon = styled.div`
  display: flex;
  width: 40rem;
  aspect-ratio: 1 / 1;
  margin: 0 10rem 0 0;
`;

export const AdditionalMenuLinkName = styled.span`
  font: inherit;
  font-weight: 500;
`;

export const AdditionalControls = styled.ul`
  border-top: #272323 1px solid;

  width: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const AdditionalControlsNavButton = styled(NavButton)`
  margin: 0 10rem;
`;
