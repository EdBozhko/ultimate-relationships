import type { SVGProps, FC } from 'react';

export interface InstallIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type InstallIconComponent = FC<InstallIconProps>;
