import { PopUpContainer } from './PopUp.style.ts';

export const PopUp = ({ children }: { children: React.ReactNode }) => {
  return <PopUpContainer>{children}</PopUpContainer>;
};
