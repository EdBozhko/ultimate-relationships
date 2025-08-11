import type { FC, SetStateAction, Dispatch } from 'react';
import type { MenuGroup } from '@comp/dom/Header/Header.types.ts';
import type { TooltipPosition } from '@comp/dom/Tooltip/Tooltip.types.ts';

export interface SubmenuStyledProps {
  $isOpened?: boolean;
}

export interface SubmenuSwiperSlideProps {
  $isAvailable?: boolean;
  $isChecked?: boolean;
}

export interface SubmenuProps {
  setSubmenuHistory: Dispatch<SetStateAction<MenuGroup[]>>;
  setIsRestrictedPopupVisible: Dispatch<SetStateAction<boolean>>;
  setIsTooltipVisible: Dispatch<SetStateAction<boolean>>;
  setTooltipPosition: Dispatch<SetStateAction<TooltipPosition>>;
  submenuHistory: MenuGroup[];
  isSubmenuOpened: boolean;
}

export type SubmenuComponent = FC<SubmenuProps>;
