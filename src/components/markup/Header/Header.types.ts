import type { FC } from 'react';

export type HeaderComponent = FC;

export interface SubmenuProps {
  $isOpened?: boolean;
}

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
}

export interface SwitcherProps {
  $isOpened?: boolean;
}

export interface AdditionalMenuProps {
  $isOpened?: boolean;
}
