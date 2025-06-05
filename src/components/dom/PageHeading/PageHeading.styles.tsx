import styled from 'styled-components';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

export const PageHeadingStyled = styled.h2`
  padding: 16rem 16rem 0 16rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font: inherit;
  font-size: 36rem;
  font-weight: 500;
  color: #c295c0;
  text-transform: capitalize;
  text-shadow:
    0 0 7px #c295c0,
    0 0 10px #c295c0,
    0 0 42px #c300b6,
    0 0 82px #c300b6;

  @media ${SCREENS.fullHd} {
    font-size: 50rem;
  }
`;
