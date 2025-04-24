import type { FC } from 'react';

export type ShopComponent = FC;

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export interface ShopLinkImageProps {
  $imageFit: ObjectFit;
}
