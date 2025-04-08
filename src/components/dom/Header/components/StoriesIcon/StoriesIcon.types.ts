import type { SVGProps, FC } from 'react';

export interface StoriesIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type StoriesIconComponent = FC<StoriesIconProps>;
