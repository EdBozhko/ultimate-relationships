'use client';

import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';
import { ShopSlider } from '@comp/dom/pages/ShopSlider';

import type { ShopComponent } from './Shop.types.ts';
import { useMemo } from 'react';

const ShopPage: ShopComponent = () => {
  const shopNavigationList = useMemo(() => Object.values(shopNavigation), [shopNavigation]);

  return <ShopSlider heading={'shop'} shopNavigation={shopNavigationList} />;
};

export default ShopPage;
