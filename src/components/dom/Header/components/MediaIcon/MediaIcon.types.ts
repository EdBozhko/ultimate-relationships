import type { SVGProps, FC } from 'react';

export interface MediaIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type MediaIconComponent = FC<MediaIconProps>;
