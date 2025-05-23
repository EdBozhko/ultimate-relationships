import type { FC } from 'react';
import type { ShopProduct } from '../pages/ShopSlider/ShopSlider.types.ts';

export interface ListWithPopupProps {
  list: ShopProduct[] | undefined;
}
export type ListWithPopupComponent = FC<ListWithPopupProps>;
