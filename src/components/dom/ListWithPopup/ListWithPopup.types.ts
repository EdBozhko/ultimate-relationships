import type { FC } from 'react';
import type { ShopProduct } from '../ShopSlider/ShopSlider.types.ts';
import type { Pages } from '@src/utils/constants.ts';

export type ListItemsPerRow = 1 | 2 | 3;
export type ListItemsOrientation = 'hor' | 'vert';

export interface ListItemProps {
  $itemsPerRow?: ListItemsPerRow;
  $itemsOrientation?: ListItemsOrientation;
}

export interface ListWithPopupProps {
  list: ShopProduct[] | undefined;
  itemsPerRow: ListItemsPerRow;
  itemsOrientation?: ListItemsOrientation;
  popupButtons?: { id: number | string; textContent: string; redirect?: Pages }[] | undefined;
}
export type ListWithPopupComponent = FC<ListWithPopupProps>;
