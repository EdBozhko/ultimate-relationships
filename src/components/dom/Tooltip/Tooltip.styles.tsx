import styled from 'styled-components';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

export const TooltipStyled = styled.div`
  width: 55rem;
  aspect-ratio: 1 / 2;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition:
    top 1s ease-in-out,
    left 1s ease-in-out;

  will-change: auto;
  background-image: url('/icons/undress-arrow-down.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 100;

  @media ${SCREENS.laptop} {
    width: unset;
    height: 55rem;
    aspect-ratio: 2 / 1;
    background-image: url('/icons/undress-arrow-right.webp');
    transform: translate(-100%, 50%);
  }
`;
