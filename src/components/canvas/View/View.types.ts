import type { FC, ReactNode } from 'react';
import type { PerspectiveCamera } from 'three';

export interface ViewProps {
  children: ReactNode;
  orbitControls: boolean;
}
export type ViewComponent = FC<ViewProps>;

interface CommonProps {
  ambientLightIntensity?: number;
  color?: string;
}
export type CommonComponent = FC<CommonProps>;

export type PerspectiveCameraProps = PerspectiveCamera;
