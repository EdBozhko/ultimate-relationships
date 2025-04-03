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

export interface InfoContainerProps {}

export interface LoadingBarCounterProps {}

export interface DisplayProgressProps {}

export interface SVGProps {}

export interface BackgroundProps {}

export interface LinearGradientProps {}
