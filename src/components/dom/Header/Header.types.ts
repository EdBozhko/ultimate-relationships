import type { FC } from 'react';

export type HeaderComponent = FC;

export interface NavLinkProps {
  color?: string;
}

export interface NavLinkIconProps {
  color?: string;
}

export interface NavLinkNameProps {
  color?: string;
}

export interface NavButtonProps extends NavLinkProps {
  href?: string;
  $isGlowing?: boolean;
}

export interface SwitcherProps {
  $isOpened?: boolean;
}

export interface MenuItem {
  id: string | number;
  name: string;
  imageSrc: string;
  available?: boolean;
  submenu?: MenuItem[];
  products?: MenuItem[];
  href?: string;
}

export type MenuGroup = MenuItem[];
