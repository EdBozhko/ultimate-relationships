'use client';

import { useState, useEffect } from 'react';
import { Container } from './Media.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { media } from '@src/helpers/lib/media.ts';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { MediaComponent } from './Media.types.ts';
import type { ListItemsPerRow } from '@comp/dom/ListWithPopup/ListWithPopup.types.ts';

export const Media: MediaComponent = () => {
  const [itemsPerRow, setItemsPerRow] = useState<ListItemsPerRow>(2);
  useEffect(() => {
    if (window.matchMedia(SCREENS.fullHd).matches) {
      setItemsPerRow(2);
    } else {
      setItemsPerRow(1);
    }
  }, []);

  return (
    <Container>
      <PageHeading textContent='Media' />
      <ListWithPopup list={media} itemsOrientation='hor' itemsPerRow={itemsPerRow} />
      <RestrictedPopup isWithCloseButton={false} />
    </Container>
  );
};
