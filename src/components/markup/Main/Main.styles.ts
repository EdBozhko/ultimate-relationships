import styled, { css } from 'styled-components';

import type { MainContainerProps, ContainerProps } from './Main.types.ts';

export const MainContainer = styled.main<MainContainerProps>`
  ${({ $headerHeight }) =>
    $headerHeight &&
    css`
      padding-bottom: calc(${$headerHeight}px + 16rem);
    `}
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  position: relative;
`;
