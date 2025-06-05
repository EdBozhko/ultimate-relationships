import styled from 'styled-components';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 0 16rem 0;

  @media ${SCREENS.fullHd} {
    padding: 0 20%;
  }
`;
