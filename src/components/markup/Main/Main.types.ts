import type { FC, ReactNode } from 'react';

export interface MainProps {
  children: ReactNode;
  headerHeight?: number | null;
}

export type MainComponent = FC<MainProps>;

export interface MainContainerProps {
  $headerHeight?: number | null;
}

export interface ContainerProps {}
