import type { FC, ReactNode } from 'react';

export interface MainLayoutStyledProps {
  $height: string;
}

interface MainLayoutProps {
  children: ReactNode;
}
export type MainLayoutComponent = FC<MainLayoutProps>;
