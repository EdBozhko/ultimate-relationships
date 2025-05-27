import styled from 'styled-components';
import { ThreeDimensionalButton } from '@comp/dom/ThreeDimensionalButton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(24, 24, 24, 0.9);
  z-index: 10;
`;

export const Title = styled.p`
  color: #ffffff;
  font: inherit;
  font-weight: 500;
  font-size: 30rem;
  margin: 0 0 10rem 0;
  padding: 0;
`;

export const CTA = styled(ThreeDimensionalButton)``;

export const ClosePopup = styled.button`
  width: 40rem;
  height: 40rem;
  position: absolute;
  top: 20rem;
  right: 20rem;

  &::after,
  &::before {
    content: '';
    display: flex;
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 10rem;
    background-color: #656565;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
