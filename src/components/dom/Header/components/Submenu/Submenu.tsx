import { useRef, useMemo, useCallback, memo, useEffect } from 'react';

import {
  SubmenuStyled,
  SubmenuNavList,
  SubmenuSwiperStyled as Swiper,
  SubmenuSwiperSlideStyled as SwiperSlide,
  SubmenuButton,
  SubmenuButtonImage,
  SubmenuButtonName,
} from './Submenu.styles.tsx';
import { BREAKPOINTS } from '@themeConfigs/constants/screen.ts';
import useGameStore from '@src/stores/useGameStore/';

import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import backIcon from '@public/icons/back.svg';

import type { Swiper as SwiperTypes } from 'swiper/types';
import type { SubmenuComponent } from './Submenu.types.ts';
import type { MenuGroup } from '@comp/dom/Header/Header.types.ts';

export const Submenu: SubmenuComponent = memo(
  ({ setSubmenuHistory, setIsRestrictedPopupVisible, submenuHistory, isSubmenuOpened }) => {
    const isBraVisible = useGameStore((store) => store.isBraVisible);
    const toggleBraVisible = useGameStore((store) => store.toggleBraVisible);

    const isCorsetVisible = useGameStore((store) => store.isCorsetVisible);
    const toggleCorsetVisible = useGameStore((store) => store.toggleCorsetVisible);

    const isPantiesVisible = useGameStore((store) => store.isPantiesVisible);
    const togglePantiesVisible = useGameStore((store) => store.togglePantiesVisible);

    const isSkirtVisible = useGameStore((store) => store.isSkirtVisible);
    const toggleSkirtVisible = useGameStore((store) => store.toggleSkirtVisible);

    const isThighStrapsVisible = useGameStore((store) => store.isThighStrapsVisible);
    const toggleThighStrapsVisible = useGameStore((store) => store.toggleThighStrapsVisible);

    const swiperRef = useRef<{ swiper: SwiperTypes } | null>(null);

    const openSubmenu = useCallback((submenu: MenuGroup) => {
      setSubmenuHistory((history) => [...history, submenu]);
    }, []);

    const goBack = useCallback(() => {
      setSubmenuHistory((history) => {
        if (history.length <= 1) return history;
        return history.slice(0, -1);
      });
    }, []);

    const renderSubmenu = useCallback(
      (menu: MenuGroup) => {
        const slides = menu
          .sort((a, b) => Number(b.available) - Number(a.available))
          .map((menuItem) => {
            const { id, imageSrc, name, submenu = undefined, available } = menuItem;
            const isChecked = () => {
              if (name === 'lather bra' && isBraVisible) {
                return true;
              } else if (name === 'lather corset' && isCorsetVisible) {
                return true;
              } else if (name === 'lather panties' && isPantiesVisible) {
                return true;
              } else if (name === 'lather skirt' && isSkirtVisible) {
                return true;
              } else if (name === 'lather thigh straps' && isThighStrapsVisible) {
                return true;
              }

              return false;
            };

            return (
              <SwiperSlide
                $isAvailable={available}
                $isChecked={isChecked()}
                onClick={() => {
                  if (!available) {
                    setIsRestrictedPopupVisible(true);
                  }

                  if (name === 'lather bra') {
                    toggleBraVisible();
                  } else if (name === 'lather corset') {
                    toggleCorsetVisible();
                  } else if (name === 'lather panties') {
                    togglePantiesVisible();
                  } else if (name === 'lather skirt') {
                    toggleSkirtVisible();
                  } else if (name === 'lather thigh straps') {
                    toggleThighStrapsVisible();
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
      },
      [
        submenuHistory,
        openSubmenu,
        goBack,
        isBraVisible,
        isCorsetVisible,
        isPantiesVisible,
        isSkirtVisible,
        isThighStrapsVisible,
      ],
    );

    const submenuContent = useMemo(
      () => (submenuHistory.length ? renderSubmenu(submenuHistory[submenuHistory.length - 1]) : null),
      [submenuHistory, renderSubmenu],
    );

    useEffect(() => {
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideTo(0, 250, false);
      }
    }, [submenuHistory]);

    return (
      <SubmenuStyled $isOpened={isSubmenuOpened}>
        <SubmenuNavList>
          <Swiper
            ref={swiperRef}
            slidesPerView={'auto'}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode, Mousewheel]}
            className='mySwiper'
            mousewheel={true}
            breakpoints={{
              [BREAKPOINTS.fullHdScreenWidth]: {
                direction: 'vertical',
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
          >
            {submenuContent}
          </Swiper>
        </SubmenuNavList>
      </SubmenuStyled>
    );
  },
);

Submenu.displayName = 'Submenu';
