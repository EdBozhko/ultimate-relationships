import type { SVGProps, FC } from 'react';

export interface MediaIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface MediaIconComponent extends FC<MediaIconProps> {}
