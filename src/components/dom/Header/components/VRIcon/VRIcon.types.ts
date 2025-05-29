import type { SVGProps, FC } from 'react';

export interface VRIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type VRIconComponent = FC<VRIconProps>;
