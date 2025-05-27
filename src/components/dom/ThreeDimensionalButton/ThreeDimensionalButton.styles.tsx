import styled from 'styled-components';

export const ThreeDimensionalButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d8acff;
  width: 300rem;
  max-width: 100%;
  text-align: center;
  font-size: 16rem;
  padding: 14rem 10rem;
  background-color: #d334e3;
  border-radius: 200rem;
  text-transform: uppercase;
  transition: transform 0.25s linear;
  cursor: pointer;
  position: relative;

  border: 1px solid #0360df;
  background-color: #0360df;
  background-image:
    radial-gradient(75% 50% at 50% 0%, #f4feff, transparent), radial-gradient(75% 35% at 50% 80%, #8de3fc, transparent);
  box-shadow:
    inset 0 -2px 4px 1px rgba(17, 110, 231, 0.6),
    inset 0 -4px 4px 1px #8de3fc,
    inset 0 0 2px 1px rgba(255, 255, 255, 0.2),
    0 1px 4px 1px rgba(17, 110, 231, 0.2),
    0 1px 4px 1px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-shadow: 0 1px 1px #116ee7;
  transition-property: border-color, transform, background-color;
  transition-duration: 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50rem;
    width: 80%;
    height: 40%;
    background-image: linear-gradient(to bottom, #f4feff, transparent);
    opacity: 0.15;
  }

  &:active {
    transform: scale(0.9);
  }

  &:not(:first-child) {
    margin: 10rem 0 0 0;
  }
`;
