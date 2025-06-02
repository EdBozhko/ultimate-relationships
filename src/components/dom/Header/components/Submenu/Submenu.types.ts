import type { FC, SetStateAction, Dispatch } from 'react';
import type { MenuGroup } from '@comp/dom/Header/Header.types.ts';

export interface SubmenuStyledProps {
  $isOpened?: boolean;
}

export interface SubmenuSwiperSlideProps {
  $isAvailable?: boolean;
}

export interface SubmenuProps {
  setSubmenuHistory: Dispatch<SetStateAction<MenuGroup[]>>;
  setIsRestrictedPopupVisible: Dispatch<SetStateAction<boolean>>;
  submenuHistory: MenuGroup[];
  isSubmenuOpened: boolean;
}

export type SubmenuComponent = FC<SubmenuProps>;
