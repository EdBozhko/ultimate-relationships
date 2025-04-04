import type { FC } from 'react';

export interface LoadingBarProps {
  progress?: number | undefined;
  loaded?: number | undefined;
  totalLoaded?: number | undefined;
  hide?: boolean | undefined;
}

export type LoadingBarComponent = FC<LoadingBarProps>;

export interface LoadingBarContainerProps {
  $hide?: boolean;
}

export interface MeterProps {
  $strokeDashoffset: number;
}
