'use client';

import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';

import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';

import type { ShopSliderLinkImageProps } from './ShopSlider.types.ts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Heading = styled(PageHeading)``;

export const SwiperStyled = styled(Swiper)`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const SwiperSlideStyled = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  font-size: 14rem;
  color: #ffffff;

  background-position: center;
  background-size: cover;
  width: 230rem;
  aspect-ratio: 1 / 1.8;

  border-radius: 10rem;
  padding: 7rem 7rem 0 7rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const shopSliderLinkCss = css`
  border-radius: 10rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110%;
  transition: transform 0.25s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export const ShopSliderLink = styled(Link)`
  ${shopSliderLinkCss}
`;

export const ShopSliderLinkName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font: inherit;
  font-size: 30rem;
  color: #f0ffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 30%;
  margin: 0;

  text-transform: uppercase;

  border-radius: 10rem;
  padding: 7rem;
  background: linear-gradient(135deg, rgba(30, 31, 37, 0.2), rgba(42, 43, 52, 0));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const ShopSliderLinkImage = styled(Image)<ShopSliderLinkImageProps>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  ${({ $imageFit }) =>
    $imageFit &&
    css`
      object-fit: ${$imageFit};
    `}
`;
