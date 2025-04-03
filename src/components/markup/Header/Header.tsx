import { usePathname } from 'next/navigation';
import { PAGES } from '@src/utils';
import {
  HeaderStyled,
  Nav,
  NavList,
  NavListItem,
  NavLink,
  NavButton,
  NavLinkName,
  NavLinkIcon,
  Switcher,
  Submenu,
  AdditionalMenu,
  AdditionalMenuList,
  AdditionalMenuListItem,
  AdditionalMenuLink,
  AdditionalMenuLinkIcon,
  AdditionalMenuLinkName,
} from './Header.styles.ts';
import { Icon, ArrowIcon } from './components/';
import { useState, forwardRef } from 'react';

import type { HeaderComponent, HeaderProps } from './Header.types.ts';

const navigation = [
  { id: PAGES.GAME, href: '/game', name: 'game', iconSrc: '' },
  { id: PAGES.CHAT, href: '/chat', name: 'chat', iconSrc: '' },
  { id: PAGES.SHOP, href: '/shop', name: 'shop', iconSrc: '' },
  { id: PAGES.MORE, href: '', name: 'more', iconSrc: '' },
];

const additionalNavigation = [
  { id: PAGES.STORIES, href: '/stories', name: 'stories', iconSrc: '' },
  { id: PAGES.MEDIA, href: '/media', name: 'media', iconSrc: '' },
  { id: PAGES.SETTINGS, href: '/settings', name: 'settings', iconSrc: '' },
];

// ForwardRef with correct type for ref
export const Header: HeaderComponent = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const pathname = usePathname();

  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);
  const onNavButtonClick = () => {
    setIsSubmenuOpened((prev) => !prev);
  };

  const [isAdditionalMenuOpened, setIsAdditionalMenuOpened] = useState(false);
  const onMoreButtonClick = () => {
    console.log('more');
    setIsAdditionalMenuOpened((prev) => !prev);
  };

  const navigationList = navigation.map((item) => {
    const { id, href, name, iconSrc } = item;

    return (
      <NavListItem key={id}>
        {pathname === href ? (
          <NavButton onClick={onNavButtonClick}>
            <Switcher $isOpened={isSubmenuOpened}>
              <ArrowIcon color={'#656565'} />
            </Switcher>
            <NavLinkIcon>{iconSrc || <Icon type={id} color={'#ce81ca'} />}</NavLinkIcon>
            <NavLinkName>{name}</NavLinkName>
          </NavButton>
        ) : (
          <NavLink href={href} onClick={id === PAGES.MORE ? onMoreButtonClick : undefined}>
            <NavLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
            <NavLinkName>{name}</NavLinkName>
          </NavLink>
        )}
      </NavListItem>
    );
  });

  const additionalNavigationList = additionalNavigation.map((item) => {
    const { id, href, name, iconSrc } = item;

    return (
      <AdditionalMenuListItem key={id}>
        <AdditionalMenuLink href={href}>
          <AdditionalMenuLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</AdditionalMenuLinkIcon>
          <AdditionalMenuLinkName>{name}</AdditionalMenuLinkName>
        </AdditionalMenuLink>
      </AdditionalMenuListItem>
    );
  });

  return (
    <HeaderStyled ref={ref}>
      <AdditionalMenu $isOpened={isAdditionalMenuOpened}>
        <AdditionalMenuList>{additionalNavigationList}</AdditionalMenuList>
      </AdditionalMenu>

      <Submenu $isOpened={isSubmenuOpened}>
        <NavList>{navigationList}</NavList>
      </Submenu>

      <Nav>
        <NavList>{navigationList}</NavList>
      </Nav>
    </HeaderStyled>
  );
});
