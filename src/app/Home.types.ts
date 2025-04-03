import type { FC, ReactNode } from 'react';

export interface HomeProps {
  children: ReactNode;
}

export type HomeComponent = FC<HomeProps>;
