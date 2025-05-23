'use client';

import { EffectCoverflow, Parallax } from 'swiper/modules';
import { memo, useMemo } from 'react';
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

import type { ShopSliderComponent } from './ShopSlider.types.ts';

export const ShopSlider: ShopSliderComponent = memo(({ heading, shopNavigation }) => {
  const shopItems = useMemo(() => {
    return shopNavigation.map((shopNavigationItem) => {
      const { id, href, name, iconSrc, imageFit = 'contain' } = shopNavigationItem;

      return (
        <SwiperSlide key={id}>
          <ShopSliderLink href={href}>
            <ShopSliderLinkImage
              data-swiper-parallax='-40%'
              src={iconSrc}
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
      <Heading>{heading}</Heading>
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
      >
        {shopItems}
      </Swiper>
    </Container>
  );
});

ShopSlider.displayName = 'ShopSlider';
