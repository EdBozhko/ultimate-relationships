'use client';

import { useState, useEffect } from 'react';
import { Container } from './Stories.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { stories } from '@src/helpers/lib/stories.ts';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import type { StoriesComponent } from './Stories.types.ts';
import type { ListItemsPerRow } from '@comp/dom/ListWithPopup/ListWithPopup.types.ts';

const popupButtons = [{ id: 1, textContent: 'select' }];

export const Stories: StoriesComponent = () => {
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
      <PageHeading textContent='Dirty Adventures' />
      <ListWithPopup popupButtons={popupButtons} list={stories} itemsOrientation='hor' itemsPerRow={itemsPerRow} />
    </Container>
  );
};
