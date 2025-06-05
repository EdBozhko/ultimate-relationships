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

import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import backIcon from '@public/icons/back.svg';

import type { Swiper as SwiperTypes } from 'swiper/types';
import type { SubmenuComponent } from './Submenu.types.ts';
import type { MenuGroup } from '@comp/dom/Header/Header.types.ts';

export const Submenu: SubmenuComponent = memo(
  ({ setSubmenuHistory, setIsRestrictedPopupVisible, submenuHistory, isSubmenuOpened }) => {
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
      },
      [submenuHistory, openSubmenu, goBack],
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
