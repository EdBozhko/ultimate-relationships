'use client';

import { useState, useEffect } from 'react';
import { Container } from './Settings.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { settings } from '@src/helpers/lib/settings.ts';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { SettingsComponent } from './Settings.types.ts';
import type { ListItemsPerRow } from '@comp/dom/ListWithPopup/ListWithPopup.types.ts';

export const Settings: SettingsComponent = () => {
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
      <PageHeading textContent='Settings' />
      <ListWithPopup list={settings} itemsOrientation='hor' itemsPerRow={itemsPerRow} />
      <RestrictedPopup isWithCloseButton={false} />
    </Container>
  );
};
