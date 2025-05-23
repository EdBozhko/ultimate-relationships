'use client';

import { memo, useState, useLayoutEffect, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemContainer,
  ListItemImage,
  ListItemImageContainer,
  ListItemName,
  AnimatedBackgroundWrapper,
  AnimatedPopup,
  AnimatedPopupClose,
  AnimatedPopupContent,
  AnimatedPopupDescriptionContainer,
  AnimatedPopupButton,
  AnimatedPopupDescriptionImage,
  AnimatedPopupDescriptionImageContainer,
  AnimatedPopupDescription,
  AnimatedPopupDescriptionTitle,
} from './ListWithPopup.styles.ts';

import { useDrag } from '@use-gesture/react';
import { useSpring, config } from '@react-spring/web';

import type { ListWithPopupComponent } from './ListWithPopup.types.ts';
import type { ShopProduct } from '../pages/ShopSlider/ShopSlider.types.ts';

export const ListWithPopup: ListWithPopupComponent = memo(({ list = [] }) => {
  const [height, setHeight] = useState(0);
  const [popupContent, setPopupContent] = useState({ image: { scr: '' }, title: '', description: '' });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight * 0.8);
    }
  }, []);

  const [{ y }, api] = useSpring(() => ({ y: height }));

  useLayoutEffect(() => {
    if (height > 0) {
      api.start({ y: height, immediate: true });
    }
  }, [height, api]);

  useEffect(() => {
    open({ canceled: false });
  }, [popupContent]);

  const handleListItemClick = (listItemData: ShopProduct) => {
    const { imageSrc, imageAltSrc, name, description = 'Fulfill your fantasies.' } = listItemData;

    setPopupContent((prev) => {
      return { ...prev, image: { ...prev.image, scr: imageAltSrc || imageSrc }, title: name, description };
    });
  };

  const open = ({ canceled = false }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
  };

  const close = (velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } });
  };

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (oy < -70) cancel();

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open position
      if (last) {
        if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close(vy);
        } else {
          open({ canceled });
        }
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else api.start({ y: oy, immediate: true });
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true },
  );

  const display = y.to((py) => (py < height ? 'flex' : 'none'));

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%) scale(1.05)', 'translateY(0px) scale(1)']),
    opacity: y.to([0, height], [0.4, 1], 'clamp'),
    pointerEvents: y.to((py) => (py < height ? 'none' : 'auto')),
  };

  const listToRender = list.map((listItem) => {
    const { id, imageSrc, name } = listItem;
    return (
      <ListItem key={id} onClick={() => handleListItemClick(listItem)}>
        <ListItemContainer>
          <ListItemImageContainer>
            <ListItemImage src={imageSrc} width={100} height={180} alt={`${name} icon`} />
          </ListItemImageContainer>
          <ListItemName>{name}</ListItemName>
        </ListItemContainer>
      </ListItem>
    );
  });

  return (
    <>
      <AnimatedBackgroundWrapper style={bgStyle}>
        <List>{listToRender}</List>
      </AnimatedBackgroundWrapper>
      <AnimatedPopup {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}>
        <AnimatedPopupClose onClick={() => close()} />
        <AnimatedPopupContent>
          <AnimatedPopupDescriptionContainer>
            <AnimatedPopupDescriptionImageContainer>
              {popupContent.image.scr && (
                <AnimatedPopupDescriptionImage
                  src={popupContent.image.scr}
                  fill={true}
                  alt={popupContent.title}
                  loading='lazy'
                />
              )}
            </AnimatedPopupDescriptionImageContainer>
            <AnimatedPopupDescriptionTitle>
              Name: <span>{popupContent.title}</span>
            </AnimatedPopupDescriptionTitle>
            <AnimatedPopupDescription>
              Description: <span>{popupContent.description}</span>
            </AnimatedPopupDescription>
          </AnimatedPopupDescriptionContainer>
          <AnimatedPopupButton>use it</AnimatedPopupButton>
        </AnimatedPopupContent>
      </AnimatedPopup>
    </>
  );
});

ListWithPopup.displayName = 'ListWithPopup';
