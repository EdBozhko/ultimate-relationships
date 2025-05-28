import { Container } from './Settings.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { settings } from '@src/helpers/lib/settings.ts';

import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { SettingsComponent } from './Settings.types.ts';

export const Settings: SettingsComponent = () => {
  return (
    <Container>
      <PageHeading textContent='Settings' />
      <ListWithPopup list={settings} itemsPerRow={1} />
      <RestrictedPopup isWithCloseButton={false} />
    </Container>
  );
};
