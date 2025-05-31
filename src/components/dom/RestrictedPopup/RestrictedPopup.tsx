import { PAGES } from '@src/utils/constants.ts';
import { Container, Title, CTA, ClosePopup } from './RestrictedPopup.styles.tsx';

import type { RestrictedPopupComponent } from './RestrictedPopup.types.ts';

export const RestrictedPopup: RestrictedPopupComponent = ({ onClosePopupClick, isWithCloseButton = true }) => {
  return (
    <Container>
      {isWithCloseButton && <ClosePopup onClick={onClosePopupClick} />}
      <Title>For members only!</Title>
      <CTA onClick={onClosePopupClick} href={PAGES.SIGN_UP}>
        join
      </CTA>
    </Container>
  );
};
