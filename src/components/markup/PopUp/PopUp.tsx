import { PopUpContainer } from './PopUp.styles.ts';

export const PopUp = ({ children }: { children: React.ReactNode }) => {
  return <PopUpContainer>{children}</PopUpContainer>;
};
