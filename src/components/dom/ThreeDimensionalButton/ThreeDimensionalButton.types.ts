import type { FC } from 'react';

export interface ThreeDimensionalButtonProps {
  textContent: string;
  onClick?: () => void;
}
export type ThreeDimensionalButtonComponent = FC<ThreeDimensionalButtonProps>;
