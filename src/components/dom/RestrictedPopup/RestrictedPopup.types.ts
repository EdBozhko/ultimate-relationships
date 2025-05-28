import type { FC } from 'react';

export interface RestrictedPopupProps {
  onClosePopupClick?: () => void;
  isWithCloseButton?: boolean;
}
export type RestrictedPopupComponent = FC<RestrictedPopupProps>;
