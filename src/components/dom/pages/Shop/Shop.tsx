'use client';

import { EffectCoverflow } from 'swiper/modules';
import { useMemo } from 'react';
import {
  Container,
  SwiperSlideStyled as SwiperSlide,
  SwiperStyled as Swiper,
  ShopHeading,
  ShopLink,
  ShopLinkImage,
  ShopLinkName,
} from './Shop.styles.ts';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { PAGES, SHOP_PAGES } from '@src/utils/constants';

import toys from '@public/icons/shop/toys.webp';
import scenes from '@public/icons/shop/scenes.webp';
import outfits from '@public/icons/shop/outfits.webp';
import models from '@public/icons/shop/models.webp';
import poses from '@public/icons/shop/poses.webp';

import type { ShopComponent } from './Shop.types.ts';

const shopNavigation = [
  { id: SHOP_PAGES.TOYS, href: `${PAGES.SHOP}/${SHOP_PAGES.TOYS}`, name: SHOP_PAGES.TOYS, iconSrc: toys },
  {
    id: SHOP_PAGES.MODELS,
    href: `${PAGES.SHOP}/${SHOP_PAGES.MODELS}`,
    name: SHOP_PAGES.MODELS,
    iconSrc: models,
    imageFit: 'cover',
  },
  { id: SHOP_PAGES.POSES, href: `${PAGES.SHOP}/${SHOP_PAGES.POSES}`, name: SHOP_PAGES.POSES, iconSrc: poses },
  {
    id: SHOP_PAGES.SCENES,
    href: `${PAGES.SHOP}/${SHOP_PAGES.SCENES}`,
    name: SHOP_PAGES.SCENES,
    iconSrc: scenes,
    imageFit: 'cover',
  },
  { id: SHOP_PAGES.OUTFITS, href: `${PAGES.SHOP}/${SHOP_PAGES.OUTFITS}`, name: SHOP_PAGES.OUTFITS, iconSrc: outfits },
];

export const Shop: ShopComponent = () => {
  const shopItems = useMemo(() => {
    return shopNavigation.map((shopNavigationItem) => {
      const { id, href, name, iconSrc, imageFit } = shopNavigationItem;

      return (
        <SwiperSlide key={id}>
          <ShopLink href={href}>
            <ShopLinkImage src={iconSrc} width={440} height={1739} alt={`${name} icon`} $imageFit={imageFit} />
            <ShopLinkName>{name}</ShopLinkName>
          </ShopLink>
        </SwiperSlide>
      );
    });
  }, [shopNavigation]);

  return (
    <Container>
      <ShopHeading>Shop</ShopHeading>
      <Swiper
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
        modules={[EffectCoverflow]}
        className='mySwiper'
      >
        {shopItems}
      </Swiper>
    </Container>
  );
};
