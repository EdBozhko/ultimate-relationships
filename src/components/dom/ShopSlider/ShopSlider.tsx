'use client';

import { EffectCoverflow, Parallax } from 'swiper/modules';
import { memo, useMemo, useState, useCallback } from 'react';
import {
  Container,
  SwiperSlideStyled as SwiperSlide,
  SwiperStyled as Swiper,
  Heading,
  ShopSliderLink,
  ShopSliderLinkImage,
  ShopSliderLinkName,
} from './ShopSlider.styles.ts';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { BREAKPOINTS } from '@themeConfigs/constants/screen.ts';

import { ClientPortal } from '@comp/dom/ClientPortal/ClientPortal.tsx';
import { RestrictedPopup } from '@comp/dom/RestrictedPopup/RestrictedPopup.tsx';

import type { ShopSliderComponent } from './ShopSlider.types.ts';

export const ShopSlider: ShopSliderComponent = memo(({ heading, shopNavigation }) => {
  const [showRestrictedPopUp, setRestrictedShowPopUp] = useState(false);

  const shopItems = useMemo(() => {
    return shopNavigation.map((shopNavigationItem) => {
      const { id, href, name, imageSrc, imageFit = 'contain', available } = shopNavigationItem;

      return (
        <SwiperSlide key={id}>
          <ShopSliderLink
            onClick={() => {
              if (!available) setRestrictedShowPopUp(true);
            }}
            href={available ? href : ''}
          >
            <ShopSliderLinkImage
              data-swiper-parallax='-40%'
              src={imageSrc}
              width={440}
              height={1739}
              alt={`${name} icon`}
              loading='lazy'
              $imageFit={imageFit}
            />
            <ShopSliderLinkName>{name}</ShopSliderLinkName>
          </ShopSliderLink>
        </SwiperSlide>
      );
    });
  }, [shopNavigation]);

  return (
    <Container>
      <Heading textContent={heading} />
      <Swiper
        speed={600}
        parallax={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Parallax]}
        className='mySwiper'
        breakpoints={{
          [BREAKPOINTS.fullHdScreenWidth]: {
            slidesPerView: 1.5,
            spaceBetween: 100,
          },
        }}
      >
        {shopItems}
      </Swiper>
      <ClientPortal selector='client-portal' show={showRestrictedPopUp}>
        <RestrictedPopup onClosePopupClick={useCallback(() => setRestrictedShowPopUp(false), [showRestrictedPopUp])} />
      </ClientPortal>
    </Container>
  );
});

ShopSlider.displayName = 'ShopSlider';
