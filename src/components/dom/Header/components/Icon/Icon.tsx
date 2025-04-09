import { PAGES } from '@src/utils';
import { GameIcon, ChatIcon, MoreIcon, ShopIcon, StoriesIcon, MediaIcon, SettingsIcon } from '../index.tsx';

import type { IconComponent, IconMap } from './Icon.types.ts';

const ICONS_MAP: IconMap = {
  [PAGES.GAME]: GameIcon,
  [PAGES.CHAT]: ChatIcon,
  [PAGES.SHOP]: ShopIcon,
  [PAGES.MORE]: MoreIcon,
  [PAGES.STORIES]: StoriesIcon,
  [PAGES.MEDIA]: MediaIcon,
  [PAGES.SETTINGS]: SettingsIcon,
};

export const Icon: IconComponent = ({ color, type }) => {
  const IconComponent = ICONS_MAP[type];
  return IconComponent ? <IconComponent color={color} /> : null;
};
