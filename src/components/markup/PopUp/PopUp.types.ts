import { FC, ReactNode } from 'react';

export interface PopUpProps {
  children: ReactNode;
  show: boolean;
}

export type PopUpComponent = FC<PopUpProps>;

export interface PopUpContentProps {
  $show: boolean;
}

export interface PopUpLinkProps {
  href: string;
  children: ReactNode;
}

export interface PopUpContainerProps {
  $show: boolean;
  children: ReactNode;
}
