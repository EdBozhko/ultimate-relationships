import type { FC, ForwardedRef } from 'react';

export interface HeaderProps {
  ref?: ForwardedRef<HTMLElement> | undefined;
}

export type HeaderComponent = FC<HeaderProps>;

export interface HeaderStyledProps {}

export interface NavProps {}

export interface SubmenuProps extends NavProps {
  $isOpened?: boolean;
}

export interface NavListProps {}

export interface NavListItemProps {}

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

export interface AdditionalMenuListProps {}

export interface AdditionalMenuListItemProps {}

export interface AdditionalMenuLinkProps {}

export interface AdditionalMenuLinkIconProps {}

export interface AdditionalMenuLinkNameProps {}
