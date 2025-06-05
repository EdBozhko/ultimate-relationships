import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import type {
  NavButtonProps,
  NavLinkProps,
  NavLinkIconProps,
  NavLinkNameProps,
  SwitcherProps,
} from './Header.types.ts';

const bounce2 = keyframes`
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-40%);}
	60% {transform: translateY(-20%);}

`;

export const HeaderStyled = styled.header`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  @media ${SCREENS.fullHd} {
    height: 100%;
    width: unset;
  }
`;

export const Nav = styled.nav`
  position: relative;
  width: 100%;
  padding: 0 10rem;
  border-top: #272323 1px solid;
  background-color: #181818;
  overflow: hidden;

  @media ${SCREENS.fullHd} {
    height: 100%;
    width: unset;
    border-top: unset;
    border-left: #272323 1px solid;
  }
`;

export const NavList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  @media ${SCREENS.fullHd} {
    height: 100%;
    width: unset;
    flex-direction: column;

    justify-content: flex-end;
    align-items: center;
  }
`;

export const NavListItem = styled.li``;

export const NavLinkIcon = styled.div<NavLinkIconProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35rem;
  aspect-ratio: 1 / 1;

  @media ${SCREENS.fullHd} {
    width: 50rem;
  }
`;

export const NavLinkName = styled.span<NavLinkNameProps>`
  font: inherit;
  font-weight: 500;

  @media ${SCREENS.fullHd} {
    font-size: 16rem;
  }
`;

export const NavLink = styled(Link)<NavLinkProps>`
  font-size: 12rem;
  color: #656565;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10rem;
  padding: 10rem 0;
  will-change: transform;
  transition: transform 0.25s ease;

  &:active {
    transform: scale(0.9);
  }

  @media ${SCREENS.fullHd} {
    margin: 12rem 0;
  }
`;

export const NavButton = styled(NavLink).attrs({ as: 'button' })<NavButtonProps>`
  position: relative;

  ${({ $isGlowing }) => {
    return (
      $isGlowing &&
      css`
        ${NavLinkIcon} {
          // Lots of drop-shadows are bad for performance
          filter: drop-shadow(0 0 7px #c295c0) drop-shadow(0 0 21px #c295c0) drop-shadow(0 0 42px #c300b6)
            drop-shadow(0 0 82px #c300b6) drop-shadow(0 0 151px #c300b6);
        }

        ${NavLinkName} {
          font-weight: 500;
          color: #c295c0;
          text-shadow:
            0 0 7px #c295c0,
            0 0 10px #c295c0,
            0 0 21px #c295c0,
            0 0 42px #c300b6,
            0 0 82px #c300b6,
            0 0 92px #c300b6,
            0 0 102px #c300b6,
            0 0 151px #c300b6;
        }
      `
    );
  }}
`;

export const Switcher = styled.div<SwitcherProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 12rem;
  animation: ${bounce2} 2s ease infinite;

  svg {
    width: 80%;
    height: 80%;
    will-change: transform;
    transition: transform 0.5s ease;
  }

  ${({ $isOpened }) =>
    $isOpened &&
    css`
      svg {
        transform: scale(-1);
      }
    `}

  @media ${SCREENS.fullHd} {
    height: 22rem;
    svg {
      width: 90%;
      height: 90%;
    }
  }
`;
