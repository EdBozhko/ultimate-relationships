import styled, { css } from 'styled-components';

const loadingBarWidth = 150;

export const LoadingBarContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InfoContainer = styled.p`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #c295c0;
  text-shadow:
    5px 5px 5px #000000,
    0 0 7px #c295c0,
    0 0 42px #c300b6,
    0 0 82px #c300b6,
    0 0 92px #c300b6,
    0 0 102px #c300b6,
    0 0 151px #c300b6;
`;

export const LoadingBarCounter = styled.span`
  font: inherit;
  font-size: 36rem;
`;

export const DisplayProgress = styled.span`
  font: inherit;
  font-size: 16rem;
`;

export const SVG = styled.svg`
  width: ${loadingBarWidth}rem;
  aspect-ratio: 1 / 1;
  overflow: visible;

  filter: drop-shadow(0 0 7px #c295c0) drop-shadow(0 0 21px #c295c0) drop-shadow(0 0 42px #c300b6)
    drop-shadow(0 0 82px #c300b6) drop-shadow(0 0 151px #c300b6) drop-shadow(10px 10px 2px #000000);
`;

export const Background = styled.circle`
  fill: none;
  stroke-width: 5rem;
  stroke: transparent;
`;

export const Meter = styled.circle`
  fill: none;
  stroke-width: 5rem;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-dasharray: calc(${loadingBarWidth}rem * 3.14);
  stroke-dashoffset: calc(${loadingBarWidth}rem * 3.14);

  ${({ $strokeDashoffset }) =>
    $strokeDashoffset &&
    css`
      stroke-dashoffset: calc(${(100 - $strokeDashoffset) / 100} * calc(${loadingBarWidth}rem * 3.14));
    `}
`;

export const LinearGradient = styled.linearGradient``;
