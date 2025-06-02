import { FC } from 'react';

import type { Pages, Controls } from '@src/utils/constants.ts';

export interface AdditionalMenuProps {
  isAdditionalMenuOpened: boolean;
  onNavButtonClick: (id: Pages | Controls) => void;
  onNavLinkClick: () => void;
}

export type AdditionalMenuComponent = FC<AdditionalMenuProps>;

export interface AdditionalMenuStyledProps {
  $isOpened?: boolean;
}
