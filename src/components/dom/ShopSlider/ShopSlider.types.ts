import type { FC } from 'react';
import type { ObjectFit } from '@src/helpers/lib/shopProducts';

export interface ShopProduct {
  id: number;
  imageSrc: string;
  imageAltSrc?: string;
  name: string;
  available?: boolean;
  description?: string;
}

export interface ShopNavigationItem {
  id: string;
  href: string;
  name: string;
  available?: boolean;
  imageSrc: string;
  imageFit?: ObjectFit;
  subpages?: { [x: string]: ShopNavigationItem };
  products?: ShopProduct[];
}
export interface ShopSliderProps {
  heading: string;
  shopNavigation: ShopNavigationItem[];
}
export type ShopSliderComponent = FC<ShopSliderProps>;

export interface ShopSliderLinkImageProps {
  $imageFit: ObjectFit;
}
