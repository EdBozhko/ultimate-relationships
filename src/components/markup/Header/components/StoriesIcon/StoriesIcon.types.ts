import type { SVGProps, FC } from 'react';

export interface StoriesIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface StoriesIconComponent extends FC<StoriesIconProps> {}
