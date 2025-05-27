import { Container, Title, CTA, ClosePopup } from './RestrictedPopup.styles.tsx';

import type { RestrictedPopupComponent } from './RestrictedPopup.types.ts';

export const RestrictedPopup: RestrictedPopupComponent = ({ onClosePopupClick }) => {
  return (
    <Container>
      <ClosePopup onClick={onClosePopupClick} />
      <Title>For members only!</Title>
      <CTA textContent='join' />
    </Container>
  );
};
