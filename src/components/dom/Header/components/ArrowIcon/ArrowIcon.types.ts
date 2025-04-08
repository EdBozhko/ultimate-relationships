import type { SVGProps, FC } from 'react';

export interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type ArrowIconComponent = FC<ArrowIconProps>;
