import { PopUpContainer, PopUpContent } from './PopUp.styles.ts';

export const PopUp = ({ children, show }: { children: React.ReactNode }) => {
  return (
    <PopUpContainer $show={show}>
      <PopUpContent $show={show}>{children}</PopUpContent>
    </PopUpContainer>
  );
};
