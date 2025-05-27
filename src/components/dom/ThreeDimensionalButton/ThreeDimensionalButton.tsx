import { ThreeDimensionalButtonStyled } from './ThreeDimensionalButton.styles.tsx';

import type { ThreeDimensionalButtonComponent } from './ThreeDimensionalButton.types.ts';

export const ThreeDimensionalButton: ThreeDimensionalButtonComponent = ({ textContent, onClick }) => {
  return <ThreeDimensionalButtonStyled onClick={onClick}>{textContent}</ThreeDimensionalButtonStyled>;
};
