'use client';

import { memo } from 'react';

import { PAGES, CONTROLS } from '@src/utils';
import { Icon } from '@comp/dom/Header/components';

import { NavListItem, NavLink, NavButton, NavLinkName, NavLinkIcon } from '@comp/dom/Header/Header.styles.tsx';

import {
  AdditionalMenuStyled,
  AdditionalMenuList,
  AdditionalMenuListItem,
  AdditionalMenuLink,
  AdditionalMenuLinkIcon,
  AdditionalMenuLinkName,
  AdditionalControls,
} from './AdditionalMenu.styles.tsx';

import type { AdditionalMenuComponent } from './AdditionalMenu.types.ts';

const additionalNavigation = [
  { id: PAGES.STORIES, href: `/${PAGES.STORIES}`, name: PAGES.STORIES.replace('-', ' '), imageSrc: '' },
  { id: PAGES.MEDIA, href: `/${PAGES.MEDIA}`, name: PAGES.MEDIA, imageSrc: '' },
  { id: PAGES.SETTINGS, href: `/${PAGES.SETTINGS}`, name: PAGES.SETTINGS, imageSrc: '' },
];

const additionalControls = [
  { id: CONTROLS.VR, href: '', name: CONTROLS.VR, imageSrc: '' },
  { id: CONTROLS.FULLSCREEN, href: '', name: CONTROLS.FULLSCREEN, imageSrc: '' },
  { id: CONTROLS.INSTALL, href: '', name: CONTROLS.INSTALL, imageSrc: '' },
];

export const AdditionalMenu: AdditionalMenuComponent = memo(
  ({ isAdditionalMenuOpened, onNavButtonClick, onNavLinkClick }) => {
    const additionalNavigationList = additionalNavigation.map((item) => {
      const { id, href, name, imageSrc } = item;

      return (
        <AdditionalMenuListItem key={id}>
          <AdditionalMenuLink href={href} onClick={onNavLinkClick}>
            <AdditionalMenuLinkIcon>{imageSrc || <Icon type={id} color={'#656565'} />}</AdditionalMenuLinkIcon>
            <AdditionalMenuLinkName>{name}</AdditionalMenuLinkName>
          </AdditionalMenuLink>
        </AdditionalMenuListItem>
      );
    });

    const additionalControlsList = additionalControls.map((item) => {
      const { id, href, name, imageSrc } = item;

      return (
        <NavListItem key={id}>
          {href && href.length > 0 ? (
            <NavLink href={href} onClick={() => onNavButtonClick(id)}>
              <NavLinkIcon>{imageSrc || <Icon type={id} color={'#656565'} />}</NavLinkIcon>
              <NavLinkName>{name}</NavLinkName>
            </NavLink>
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
      <AdditionalMenuStyled $isOpened={isAdditionalMenuOpened}>
        <AdditionalMenuList>{additionalNavigationList}</AdditionalMenuList>
        <AdditionalControls>{additionalControlsList}</AdditionalControls>
      </AdditionalMenuStyled>
    );
  },
);

AdditionalMenu.displayName = 'AdditionalMenu';
