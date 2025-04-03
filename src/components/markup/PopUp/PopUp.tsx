import { PopUpContainer, PopUpContent } from './PopUp.styles.ts';

import type { PopUpComponent } from './PopUp.types.ts';

export const PopUp: PopUpComponent = ({ children, show }) => {
  return (
    <PopUpContainer $show={show}>
      <PopUpContent $show={show}>{children}</PopUpContent>
    </PopUpContainer>
  );
};
