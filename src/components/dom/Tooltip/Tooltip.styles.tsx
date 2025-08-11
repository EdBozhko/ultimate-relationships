import styled from 'styled-components';

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
`;
