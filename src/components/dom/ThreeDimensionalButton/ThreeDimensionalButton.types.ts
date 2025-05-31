import type { FC, ButtonHTMLAttributes } from 'react';

export interface ThreeDimensionalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
  onClick?: () => void;
}
export type ThreeDimensionalButtonComponent = FC<ThreeDimensionalButtonProps>;
