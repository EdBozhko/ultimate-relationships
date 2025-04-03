import type { SVGProps, FC } from 'react';

export interface ShopIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface ShopIconComponent extends FC<ShopIconProps> {}
