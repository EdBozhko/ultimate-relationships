import type { FC, ForwardedRef } from 'react';

export interface HeaderProps {
  ref?: ForwardedRef<HTMLElement> | undefined;
}

export type HeaderComponent = FC<HeaderProps>;

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
