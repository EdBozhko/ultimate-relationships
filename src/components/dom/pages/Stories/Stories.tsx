import { Container } from './Stories.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';
import { ListWithPopup } from '@comp/dom/ListWithPopup/ListWithPopup.tsx';
import { stories } from '@src/helpers/lib/stories.ts';

import type { StoriesComponent } from './Stories.types.ts';

export const Stories: StoriesComponent = () => {
  return (
    <Container>
      <PageHeading textContent='Dirty Adventures' />
      <ListWithPopup list={stories} itemsPerRow={1} />
    </Container>
  );
};
