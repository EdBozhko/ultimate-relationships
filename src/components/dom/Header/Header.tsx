'use client';

import { usePathname } from 'next/navigation';
import { PAGES, CONTROLS, MODELS_PAGES } from '@src/utils';
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
} from './Header.styles.tsx';

import { Icon, ArrowIcon, AdditionalMenu, Submenu } from './components/index.tsx';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';
import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';
import useGlobalStore from '@src/stores/useGlobalStore/';
import { useFullscreen } from '@src/hooks/useFullscreen.ts';

import type { HeaderComponent, MenuGroup } from './Header.types.ts';
import { type Pages, type Controls, SHOP_PAGES, POSES_PAGES } from '@src/utils/constants.ts';

const navigation = {
  [PAGES.GAME]: {
    id: PAGES.GAME,
    href: `/${PAGES.GAME}`,
    name: PAGES.GAME,
    imageSrc: '',
    submenu: [
      {
        ...shopNavigation[SHOP_PAGES.MODELS],
        submenu: [
          {
            ...(shopNavigation[SHOP_PAGES.MODELS].subpages?.[MODELS_PAGES.FEMALE] ?? {}),
            submenu: shopNavigation[SHOP_PAGES.MODELS].subpages?.[MODELS_PAGES.FEMALE].products ?? [],
          },
          { ...(shopNavigation[SHOP_PAGES.MODELS].subpages?.[MODELS_PAGES.FURRY] ?? {}) },
          { ...(shopNavigation[SHOP_PAGES.MODELS].subpages?.[MODELS_PAGES.MALE] ?? {}) },
          { ...(shopNavigation[SHOP_PAGES.MODELS].subpages?.[MODELS_PAGES.TRANS] ?? {}) },
        ],
      },
      { ...shopNavigation[SHOP_PAGES.TOYS], submenu: shopNavigation[SHOP_PAGES.TOYS].products },
      {
        ...shopNavigation[SHOP_PAGES.POSES],
        submenu: [
          {
            ...(shopNavigation[SHOP_PAGES.POSES].subpages?.[POSES_PAGES.SINGLE] ?? {}),
            submenu: shopNavigation[SHOP_PAGES.POSES].subpages?.[POSES_PAGES.SINGLE].products ?? [],
          },
          { ...(shopNavigation[SHOP_PAGES.POSES].subpages?.[POSES_PAGES.COUPLE] ?? {}) },
          { ...(shopNavigation[SHOP_PAGES.POSES].subpages?.[POSES_PAGES.TRIPLE] ?? {}) },
          { ...(shopNavigation[SHOP_PAGES.POSES].subpages?.[POSES_PAGES.GROUP] ?? {}) },
        ],
      },
      { ...shopNavigation[SHOP_PAGES.SCENES], submenu: shopNavigation[SHOP_PAGES.SCENES].products },
      { ...shopNavigation[SHOP_PAGES.OUTFITS], submenu: shopNavigation[SHOP_PAGES.OUTFITS].products },
    ],
  },
  [PAGES.CHAT]: { id: PAGES.CHAT, href: `/${PAGES.CHAT}`, name: PAGES.CHAT, imageSrc: '', submenu: [] },
  [PAGES.SHOP]: { id: PAGES.SHOP, href: `/${PAGES.SHOP}`, name: PAGES.SHOP, imageSrc: '', submenu: [] },
  [PAGES.MORE]: { id: PAGES.MORE, href: '', name: PAGES.MORE, imageSrc: '', submenu: [] },
};

export const Header: HeaderComponent = () => {
  const isHeaderVisible = useGlobalStore((state) => state.isHeaderVisible);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const pathname = usePathname();

  const isAdditionalMenuOpened = useGlobalStore((state) => state.isAdditionalMenuOpened);
  const toggleAdditionalMenu = useGlobalStore((state) => state.toggleAdditionalMenu);
  const closeAdditionalMenu = useGlobalStore((state) => state.closeAdditionalMenu);

  const [isRestrictedPopupVisible, setIsRestrictedPopupVisible] = useState(false);
  const [submenuHistory, setSubmenuHistory] = useState<MenuGroup[]>([]);
  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);

  useEffect(() => {
    setIsSubmenuOpened(submenuHistory.length > 0);
  }, [submenuHistory]);

  const onNavButtonClick = useCallback(
    (id: Pages | Controls) => {
      switch (id) {
        case CONTROLS.FULLSCREEN:
          if (!isFullscreen()) {
            enterFullscreen();
          } else {
            exitFullscreen();
          }
          break;

        case CONTROLS.VR:
        case CONTROLS.INSTALL:
          closeAdditionalMenu();
          setIsRestrictedPopupVisible(true);
          break;

        case PAGES.MORE:
          toggleAdditionalMenu();
          break;

        default:
          break;
      }

      if (isSubmenuOpened) {
        setIsSubmenuOpened(false);
        return;
      }

      if (id in navigation) {
        //@ts-expect-error: nav types deep error (fix on refactor)
        const navItem = navigation[id];
        if (navItem.submenu && navItem.submenu.length > 0) {
          setSubmenuHistory([navItem.submenu]);
          setIsSubmenuOpened(true);
        }
      }
    },
    [
      isFullscreen,
      enterFullscreen,
      exitFullscreen,
      closeAdditionalMenu,
      setIsRestrictedPopupVisible,
      toggleAdditionalMenu,
      isSubmenuOpened,
    ],
  );

  const onNavLinkClick = useCallback(() => {
    if (isAdditionalMenuOpened) {
      closeAdditionalMenu();
    }
    if (isRestrictedPopupVisible) {
      setIsRestrictedPopupVisible(false);
    }
    if (isSubmenuOpened) {
      setIsSubmenuOpened(false);
    }
    setSubmenuHistory([]);
  }, [isAdditionalMenuOpened, closeAdditionalMenu, isRestrictedPopupVisible, isSubmenuOpened]);

  const navigationList = useMemo(
    () =>
      Object.values(navigation).map((item) => {
        const { id, href, name, imageSrc, submenu } = item;

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
                  <NavLinkIcon>{imageSrc || <Icon type={id} color={'#ce81ca'} />}</NavLinkIcon>
                  <NavLinkName>{name}</NavLinkName>
                </NavButton>
              ) : (
                <NavLink href={href} onClick={onNavLinkClick}>
                  <NavLinkIcon>{imageSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
                  <NavLinkName>{name}</NavLinkName>
                </NavLink>
              )
            ) : (
              <NavButton onClick={() => onNavButtonClick(id)}>
                <NavLinkIcon>{imageSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
                <NavLinkName>{name}</NavLinkName>
              </NavButton>
            )}
          </NavListItem>
        );
      }),
    [pathname, isSubmenuOpened, onNavButtonClick, onNavLinkClick],
  );

  return (
    <>
      {isHeaderVisible && (
        <HeaderStyled>
          <AdditionalMenu
            isAdditionalMenuOpened={isAdditionalMenuOpened}
            onNavButtonClick={onNavButtonClick}
            onNavLinkClick={onNavLinkClick}
          />

          <Submenu
            setSubmenuHistory={setSubmenuHistory}
            setIsRestrictedPopupVisible={setIsRestrictedPopupVisible}
            submenuHistory={submenuHistory}
            isSubmenuOpened={isSubmenuOpened}
          />

          <Nav>
            <NavList>{navigationList}</NavList>
          </Nav>
        </HeaderStyled>
      )}
      {isRestrictedPopupVisible && <RestrictedPopup onClosePopupClick={() => setIsRestrictedPopupVisible(false)} />}
    </>
  );
};
