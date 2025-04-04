import styled, { css } from 'styled-components';
import Link from 'next/link';

import type {
  AdditionalMenuProps,
  NavButtonProps,
  NavLinkProps,
  NavLinkIconProps,
  NavLinkNameProps,
  SubmenuProps,
  SwitcherProps,
} from './Header.types.ts';

export const HeaderStyled = styled.header`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 10rem;
  border-top: #272323 1px solid;
  background-color: #181818;
  overflow: hidden;
`;

export const Submenu = styled(Nav).attrs({ as: 'div' })<SubmenuProps>`
  position: relative;
  padding: 0 10rem;
  border-top: #272323 1px solid;
  will-change: transform;
  transition: transform 0.5s ease;
  transform: translate(0, 0);

  ${({ $isOpened }) =>
    $isOpened &&
    css`
      transform: translate(0, -100%);
    `}
`;

export const NavList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const NavListItem = styled.li``;

export const NavLinkIcon = styled.div<NavLinkIconProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35rem;
  aspect-ratio: 1 / 1;
`;

export const NavLinkName = styled.span<NavLinkNameProps>`
  font: inherit;
  font-weight: 400;
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
`;

export const NavButton = styled(NavLink).attrs({ as: 'button' })<NavButtonProps>`
  position: relative;

  ${NavLinkIcon} {
    // Lots of drop-shadows are bad for performance
    filter: drop-shadow(0 0 7px #c295c0) drop-shadow(0 0 21px #c295c0) drop-shadow(0 0 42px #c300b6)
      drop-shadow(0 0 82px #c300b6) drop-shadow(0 0 151px #c300b6);
  }

  ${NavLinkName} {
    font-weight: 400;
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
`;

export const AdditionalMenu = styled.div<AdditionalMenuProps>`
  position: absolute;
  background-color: #181818;
  width: 100vw;
  height: 100vh;
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
`;

export const AdditionalMenuList = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
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
`;

export const AdditionalMenuLinkIcon = styled.div`
  display: flex;
  width: 40rem;
  aspect-ratio: 1 / 1;
  margin: 0 10rem 0 0;
`;

export const AdditionalMenuLinkName = styled.span`
  font: inherit;
  font-weight: 400;
`;
