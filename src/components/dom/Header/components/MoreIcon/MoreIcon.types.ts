import type { SVGProps, FC } from 'react';

export interface MoreIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type MoreIconComponent = FC<MoreIconProps>;
