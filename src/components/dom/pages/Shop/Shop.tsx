'use client';

import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';
import { ShopSlider } from '@comp/dom/ShopSlider/index.tsx';

import type { ShopComponent } from './Shop.types.ts';
import { useMemo } from 'react';

export const Shop: ShopComponent = () => {
  const shopNavigationList = useMemo(() => Object.values(shopNavigation), [shopNavigation]);

  return <ShopSlider heading={'shop'} shopNavigation={shopNavigationList} />;
};
