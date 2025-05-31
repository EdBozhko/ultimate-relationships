'use client';

import { usePathname } from 'next/navigation';
import { PAGES, CONTROLS } from '@src/utils';
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
  AdditionalControls,
} from './Header.styles.ts';
import { Icon, ArrowIcon } from './components/index.tsx';
import { useState } from 'react';

import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import useGlobalStore from '@src/stores/useGlobalStore/';

import type { HeaderComponent } from './Header.types.ts';
import type { Pages, Controls } from '@src/utils/constants.ts';

const navigation = {
  [PAGES.GAME]: { id: PAGES.GAME, href: `/${PAGES.GAME}`, name: PAGES.GAME, iconSrc: '', submenu: [{}] },
  [PAGES.CHAT]: { id: PAGES.CHAT, href: `/${PAGES.CHAT}`, name: PAGES.CHAT, iconSrc: '', submenu: [] },
  [PAGES.SHOP]: { id: PAGES.SHOP, href: `/${PAGES.SHOP}`, name: PAGES.SHOP, iconSrc: '', submenu: [] },
  [PAGES.MORE]: { id: PAGES.MORE, href: '', name: PAGES.MORE, iconSrc: '', submenu: [] },
};
const additionalNavigation = [
  { id: PAGES.STORIES, href: `/${PAGES.STORIES}`, name: PAGES.STORIES.replace('-', ' '), iconSrc: '' },
  { id: PAGES.MEDIA, href: `/${PAGES.MEDIA}`, name: PAGES.MEDIA, iconSrc: '' },
  { id: PAGES.SETTINGS, href: `/${PAGES.SETTINGS}`, name: PAGES.SETTINGS, iconSrc: '' },
];

const additionalControls = [
  { id: CONTROLS.VR, href: '', name: CONTROLS.VR, iconSrc: '' },
  { id: CONTROLS.FULLSCREEN, href: '', name: CONTROLS.FULLSCREEN, iconSrc: '' },
];

export const Header: HeaderComponent = () => {
  const isHeaderVisible = useGlobalStore((state) => state.isHeaderVisible);

  const pathname = usePathname();

  const isAdditionalMenuOpened = useGlobalStore((state) => state.isAdditionalMenuOpened);
  const toggleAdditionalMenu = useGlobalStore((state) => state.toggleAdditionalMenu);
  const closeAdditionalMenu = useGlobalStore((state) => state.closeAdditionalMenu);
  const onMoreButtonClick = () => {
    toggleAdditionalMenu();
  };

  const [isRestrictedPopupVisible, setIsRestrictedPopupVisible] = useState(false);

  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);

  const onNavButtonClick = (id: Pages | Controls) => {
    //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

    switch (id) {
      case CONTROLS.FULLSCREEN:
        if (!isFullscreen) {
          if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
            //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
          } else if (document.body.webkitRequestFullscreen) {
            //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
            document.body.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
          } else if (document.webkitExitFullscreen) {
            //@ts-expect-error: TypeScript’s type definitions for Document don’t include the non-standard webkitFullscreenElement property by default
            document.webkitExitFullscreen();
          }
        }
        break;

      case CONTROLS.VR:
        closeAdditionalMenu();
        setIsRestrictedPopupVisible(true);
        break;

      case PAGES.MORE:
        onMoreButtonClick();
        break;

      default:
        break;
    }

    if (id in navigation) {
      const navItem = navigation[id as keyof typeof navigation];
      if (navItem.submenu && navItem.submenu.length > 0) {
        setIsSubmenuOpened((prev) => !prev);
      }
    }
  };

  const onNavLinkClick = () => {
    if (isAdditionalMenuOpened) {
      closeAdditionalMenu();
    }

    if (isRestrictedPopupVisible) {
      setIsRestrictedPopupVisible(false);
    }

    if (isSubmenuOpened) {
      setIsSubmenuOpened(false);
    }
  };

  const navigationList = Object.values(navigation).map((item) => {
    const { id, href, name, iconSrc, submenu } = item;
    console.log(href && href.length > 0);

    return (
      <NavListItem key={id}>
        {href && href.length > 0 ? (
          pathname === href ? (
            <NavButton $isGlowing={true} onClick={() => onNavButtonClick(id)}>
              {submenu && submenu.length > 0 && (
                <Switcher $isOpened={isSubmenuOpened}>
                  <ArrowIcon color={'#656565'} />
                </Switcher>
              )}
              <NavLinkIcon>{iconSrc || <Icon type={id} color={'#ce81ca'} />}</NavLinkIcon>
              <NavLinkName>{name}</NavLinkName>
            </NavButton>
          ) : (
            <NavLink href={href} onClick={onNavLinkClick}>
              <NavLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
              <NavLinkName>{name}</NavLinkName>
            </NavLink>
          )
        ) : (
          <NavButton onClick={() => onNavButtonClick(id)}>
            <NavLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
            <NavLinkName>{name}</NavLinkName>
          </NavButton>
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

  const additionalControlsList = additionalControls.map((item) => {
    const { id, href, name, iconSrc } = item;

    return (
      <NavListItem key={id}>
        {href && href.length > 0 ? (
          pathname === href ? (
            <NavButton $isGlowing={true} onClick={() => onNavButtonClick(id)}>
              <Switcher $isOpened={isSubmenuOpened}>
                <ArrowIcon color={'#656565'} />
              </Switcher>
              <NavLinkIcon>{iconSrc || <Icon type={id} color={'#ce81ca'} />}</NavLinkIcon>
              <NavLinkName>{name}</NavLinkName>
            </NavButton>
          ) : (
            <NavLink href={href} onClick={() => onNavButtonClick(id)}>
              <NavLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
              <NavLinkName>{name}</NavLinkName>
            </NavLink>
          )
        ) : (
          <NavButton onClick={() => onNavButtonClick(id)}>
            {/* <Switcher $isOpened={isSubmenuOpened}>
              <ArrowIcon color={'#656565'} />
            </Switcher> */}
            <NavLinkIcon>{iconSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
            <NavLinkName>{name}</NavLinkName>
          </NavButton>
        )}
      </NavListItem>
    );
  });

  return (
    <>
      {isHeaderVisible && (
        <HeaderStyled>
          <AdditionalMenu $isOpened={isAdditionalMenuOpened}>
            <AdditionalMenuList>{additionalNavigationList}</AdditionalMenuList>
            <AdditionalControls>{additionalControlsList}</AdditionalControls>
          </AdditionalMenu>

          <Submenu $isOpened={isSubmenuOpened}>
            <NavList>{navigationList}</NavList>
          </Submenu>

          <Nav>
            <NavList>{navigationList}</NavList>
          </Nav>
        </HeaderStyled>
      )}
      {isRestrictedPopupVisible && <RestrictedPopup onClosePopupClick={() => setIsRestrictedPopupVisible(false)} />}
    </>
  );
};
