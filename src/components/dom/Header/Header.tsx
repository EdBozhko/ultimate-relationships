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
  Submenu,
  SubmenuNavList,
  SubmenuSwiperStyled as Swiper,
  SubmenuSwiperSlideStyled as SwiperSlide,
  SubmenuButton,
  SubmenuButtonImage,
  SubmenuButtonName,
} from './Header.styles.tsx';
import { Icon, ArrowIcon, AdditionalMenu } from './components/index.tsx';
import { useState, useEffect, useRef } from 'react';

import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';
import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';
import useGlobalStore from '@src/stores/useGlobalStore/';
import { useFullscreen } from '@src/hooks/useFullscreen.ts';

import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import backIcon from '@public/icons/back.svg';

import type { HeaderComponent } from './Header.types.ts';
import { type Pages, type Controls, SHOP_PAGES } from '@src/utils/constants.ts';

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
            ...shopNavigation[SHOP_PAGES.MODELS].subpages[MODELS_PAGES.FEMALE],
            submenu: shopNavigation[SHOP_PAGES.MODELS].subpages[MODELS_PAGES.FEMALE].products,
          },
          { ...shopNavigation[SHOP_PAGES.MODELS].subpages[MODELS_PAGES.FURRY] },
          { ...shopNavigation[SHOP_PAGES.MODELS].subpages[MODELS_PAGES.MALE] },
          { ...shopNavigation[SHOP_PAGES.MODELS].subpages[MODELS_PAGES.TRANS] },
        ],
      },
      { ...shopNavigation[SHOP_PAGES.TOYS], submenu: shopNavigation[SHOP_PAGES.TOYS].products },
      { ...shopNavigation[SHOP_PAGES.POSES] },
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

  const [submenuHistory, setSubmenuHistory] = useState([]);
  const [isSubmenuOpened, setIsSubmenuOpened] = useState(false);
  const [submenuContent, setSubmenuContent] = useState<JSX.Element[] | null>(null);

  const swiperRef = useRef();

  const renderSubmenu = (menu) => {
    swiperRef.current.swiper.slideTo(0, 250, false);

    const slides = menu
      .sort((a, b) => Number(b.available) - Number(a.available))
      .map((menuItem) => {
        const { id, imageSrc, name, submenu = undefined, available } = menuItem;
        return (
          <SwiperSlide
            $isAvailable={available}
            onClick={() => {
              if (!available) {
                setIsRestrictedPopupVisible(true);
              }
            }}
            key={id}
          >
            <SubmenuButton onClick={() => submenu && openSubmenu(submenu)}>
              <SubmenuButtonImage
                data-swiper-parallax='-40%'
                src={imageSrc}
                width={440}
                height={1739}
                alt={`${name} icon`}
                loading='lazy'
                $imageFit='contain'
              />
            </SubmenuButton>
            <SubmenuButtonName>{name}</SubmenuButtonName>
          </SwiperSlide>
        );
      });

    if (submenuHistory.length > 1) {
      slides.unshift(
        <SwiperSlide $isAvailable={true} key='back'>
          <SubmenuButton onClick={goBack}>
            <SubmenuButtonImage
              data-swiper-parallax='-40%'
              src={backIcon}
              width={440}
              height={1739}
              alt={`back icon`}
              loading='lazy'
              $imageFit='contain'
            />
          </SubmenuButton>
        </SwiperSlide>,
      );
    }
    return slides;
  };

  // Open a new submenu, pushing to history
  const openSubmenu = (submenu) => {
    setSubmenuHistory((history) => [...history, submenu]);
  };

  // Go back to previous submenu
  const goBack = () => {
    setSubmenuHistory((history) => {
      if (history.length <= 1) return history;
      const newHistory = history.slice(0, -1);
      return newHistory;
    });
  };

  // Update submenu content when history changes
  useEffect(() => {
    if (submenuHistory.length) {
      setSubmenuContent(renderSubmenu(submenuHistory[submenuHistory.length - 1]));
      setIsSubmenuOpened(true);
    } else {
      setSubmenuContent(null);
      setIsSubmenuOpened(false);
    }
  }, [submenuHistory]);

  const onNavButtonClick = (id: Pages | Controls) => {
    switch (id) {
      case CONTROLS.FULLSCREEN:
        if (!isFullscreen()) {
          enterFullscreen();
        } else {
          exitFullscreen();
        }
        break;

      case CONTROLS.VR:
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

    // Handle submenu root opening
    if (id in navigation) {
      const navItem = navigation[id as keyof typeof navigation];
      if (navItem.submenu && navItem.submenu.length > 0) {
        setSubmenuHistory([navItem.submenu]);
        setIsSubmenuOpened(true);
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

    setSubmenuHistory([]);
  };

  const navigationList = Object.values(navigation).map((item) => {
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
  });

  return (
    <>
      {isHeaderVisible && (
        <HeaderStyled>
          <AdditionalMenu
            isAdditionalMenuOpened={isAdditionalMenuOpened}
            onNavButtonClick={onNavButtonClick}
            onNavLinkClick={onNavLinkClick}
          />

          <Submenu $isOpened={isSubmenuOpened}>
            <SubmenuNavList>
              <Swiper
                ref={swiperRef}
                slidesPerView={'auto'}
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                className='mySwiper'
              >
                {submenuContent}
              </Swiper>
            </SubmenuNavList>
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
