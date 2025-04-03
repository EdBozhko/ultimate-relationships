import type { SVGProps, FC } from 'react';

export interface GameIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface GameIconComponent extends FC<GameIconProps> {}
