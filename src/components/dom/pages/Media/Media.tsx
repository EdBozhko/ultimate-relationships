import { Container } from './Media.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { media } from '@src/helpers/lib/media.ts';

import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { MediaComponent } from './Media.types.ts';

export const Media: MediaComponent = () => {
  return (
    <Container>
      <PageHeading textContent='Media' />
      <ListWithPopup list={media} itemsPerRow={1} />
      <RestrictedPopup isWithCloseButton={false} />
    </Container>
  );
};
