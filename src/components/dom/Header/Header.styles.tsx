import styled, { css } from 'styled-components';
import Link from 'next/link';

import {
  SwiperStyled,
  SwiperSlideStyled,
  ShopSliderLinkImage,
  ShopSliderLinkName,
  shopSliderLinkCss,
} from '@comp/dom/ShopSlider/ShopSlider.styles.ts';

import type {
  NavButtonProps,
  NavLinkProps,
  NavLinkIconProps,
  NavLinkNameProps,
  SubmenuProps,
  SwitcherProps,
  SubmenuSwiperSlideProps,
} from './Header.types.ts';

export const HeaderStyled = styled.header`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

export const Nav = styled.nav`
  position: relative;
  width: 100%;
  padding: 0 10rem;
  border-top: #272323 1px solid;
  background-color: #181818;
  overflow: hidden;
`;

export const Submenu = styled(Nav).attrs({ as: 'div' })<SubmenuProps>`
  position: absolute;
  top: 0;
  left: 0;
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

export const SubmenuNavList = styled(NavList).attrs({ as: 'div' })``;

export const SubmenuSwiperStyled = styled(SwiperStyled)`
  padding-top: 10rem;
  padding-bottom: 10rem;
`;

export const SubmenuSwiperSlideStyled = styled(SwiperSlideStyled)<SubmenuSwiperSlideProps>`
  width: 100rem;
  overflow: hidden;

  ${({ $isAvailable }) =>
    !$isAvailable &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
      }
    `}
`;

export const SubmenuButton = styled.button`
  ${shopSliderLinkCss}
  height: 100%;
`;

export const SubmenuButtonImage = styled(ShopSliderLinkImage)``;

export const SubmenuButtonName = styled(ShopSliderLinkName)`
  font-size: 16rem;
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
  font-weight: 500;
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
