import styled, { css } from 'styled-components';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import type { MainLayoutStyledProps } from './MainLayout.types.ts';

export const MainLayoutStyled = styled.div<MainLayoutStyledProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: auto;
  display: flex;
  flex-direction: column-reverse;

  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}

  @media ${SCREENS.fullHd} {
    flex-direction: row-reverse;
  }
`;
