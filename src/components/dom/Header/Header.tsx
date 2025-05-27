'use client';

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
import { Icon, ArrowIcon } from './components/index.tsx';
import { useState } from 'react';

import useGlobalStore from '@src/stores/useGlobalStore/';

import type { HeaderComponent } from './Header.types.ts';

const navigation = [
  { id: PAGES.GAME, href: `/${PAGES.GAME}`, name: PAGES.GAME, iconSrc: '' },
  { id: PAGES.CHAT, href: `/${PAGES.CHAT}`, name: PAGES.CHAT, iconSrc: '' },
  { id: PAGES.SHOP, href: `/${PAGES.SHOP}`, name: PAGES.SHOP, iconSrc: '' },
  { id: PAGES.MORE, href: '', name: PAGES.MORE, iconSrc: '' },
];

const additionalNavigation = [
  { id: PAGES.STORIES, href: `/${PAGES.STORIES}`, name: PAGES.STORIES.replace('-', ' '), iconSrc: '' },
  { id: PAGES.MEDIA, href: `/${PAGES.MEDIA}`, name: PAGES.MEDIA, iconSrc: '' },
  { id: PAGES.SETTINGS, href: `/${PAGES.SETTINGS}`, name: PAGES.SETTINGS, iconSrc: '' },
];

export const Header: HeaderComponent = () => {
  const pathname = usePathname();

  const isAdditionalMenuOpened = useGlobalStore((state) => state.isAdditionalMenuOpened);
  const toggleAdditionalMenu = useGlobalStore((state) => state.toggleAdditionalMenu);
  const closeAdditionalMenu = useGlobalStore((state) => state.closeAdditionalMenu);
  const onMoreButtonClick = () => {
    toggleAdditionalMenu();
  };

  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);
  const onNavButtonClick = () => {
    setIsSubmenuOpened((prev) => !prev);
  };

  const onNavLinkClick = () => {
    closeAdditionalMenu();
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
          <NavLink href={href} onClick={id === PAGES.MORE ? onMoreButtonClick : onNavLinkClick}>
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
        <AdditionalMenuLink href={href} onClick={onNavLinkClick}>
          <AdditionalMenuLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</AdditionalMenuLinkIcon>
          <AdditionalMenuLinkName>{name}</AdditionalMenuLinkName>
        </AdditionalMenuLink>
      </AdditionalMenuListItem>
    );
  });

  return (
    <HeaderStyled>
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
};
