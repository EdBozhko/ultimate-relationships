import type { FC } from 'react';
import type { ShopProduct } from '../ShopSlider/ShopSlider.types.ts';

export type ListItemsPerRow = 1 | 2;

export interface ListItemProps {
  $itemsPerRow?: ListItemsPerRow;
}

export interface ListWithPopupProps {
  list: ShopProduct[] | undefined;
  itemsPerRow: ListItemsPerRow;
}
export type ListWithPopupComponent = FC<ListWithPopupProps>;
