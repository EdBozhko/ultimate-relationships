import styled, { css } from 'styled-components';
import { Nav, NavList } from '@comp/dom/Header/Header.styles.tsx';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import {
  SwiperStyled,
  SwiperSlideStyled,
  ShopSliderLinkImage,
  ShopSliderLinkName,
  shopSliderLinkCss,
} from '@comp/dom/ShopSlider/ShopSlider.styles.ts';

import type { SubmenuStyledProps, SubmenuSwiperSlideProps } from './Submenu.types.ts';

export const SubmenuStyled = styled(Nav).attrs({ as: 'div' })<SubmenuStyledProps>`
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

      @media ${SCREENS.fullHd} {
        transform: translate(-100%, 0);
        padding: 0 20rem;
      }
    `}
`;

export const SubmenuNavList = styled(NavList).attrs({ as: 'div' })``;

export const SubmenuSwiperStyled = styled(SwiperStyled)`
  padding: 10rem;
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

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      border: 1px solid #c295c0;
      box-shadow:
        0 0 7px #c295c0,
        0 0 10px #c295c0;

      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    `}
  


  @media ${SCREENS.fullHd} {
    width: 200rem;
  }
`;

export const SubmenuButton = styled.button`
  ${shopSliderLinkCss}
  height: 100%;
`;

export const SubmenuButtonImage = styled(ShopSliderLinkImage)``;

export const SubmenuButtonName = styled(ShopSliderLinkName)`
  font-size: 16rem;

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
  }
`;
