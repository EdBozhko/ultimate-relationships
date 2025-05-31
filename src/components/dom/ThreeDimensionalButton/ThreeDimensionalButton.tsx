import { ThreeDimensionalButtonStyled } from './ThreeDimensionalButton.styles.tsx';

import type { ThreeDimensionalButtonComponent } from './ThreeDimensionalButton.types.ts';

export const ThreeDimensionalButton: ThreeDimensionalButtonComponent = ({ textContent, onClick, ...props }) => {
  return (
    <ThreeDimensionalButtonStyled {...props} onClick={onClick}>
      {textContent}
    </ThreeDimensionalButtonStyled>
  );
};
