import type { FC } from 'react';

export interface RestrictedPopupProps {
  onClosePopupClick: () => void;
}
export type RestrictedPopupComponent = FC<RestrictedPopupProps>;
