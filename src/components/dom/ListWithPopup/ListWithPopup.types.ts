import type { FC } from 'react';
import type { ShopProduct } from '../ShopSlider/ShopSlider.types.ts';

export interface ListItemProps {
  $itemsPerRow?: number;
}

export interface ListWithPopupProps {
  list: ShopProduct[] | undefined;
}
export type ListWithPopupComponent = FC<ListWithPopupProps>;
