import type { SVGProps, FC } from 'react';

export interface ShopIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export type ShopIconComponent = FC<ShopIconProps>;
