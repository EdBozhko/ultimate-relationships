import styled, { css } from 'styled-components';

export const MainContainer = styled.main`
  ${({ $headerHeight }) =>
    $headerHeight &&
    css`
      padding-bottom: calc(${$headerHeight}px + 16rem);
    `}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
