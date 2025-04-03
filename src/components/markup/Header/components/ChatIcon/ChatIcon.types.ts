import type { SVGProps, FC } from 'react';

export interface ChatIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface ChatIconComponent extends FC<ChatIconProps> {}
