import type { FC } from 'react';

export interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipProps {
  position: TooltipPosition;
}

export type TooltipComponent = FC<TooltipProps>;
