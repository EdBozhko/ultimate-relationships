import type { SVGProps, FC } from 'react';

export interface FullscreenIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type FullscreenIconComponent = FC<FullscreenIconProps>;
