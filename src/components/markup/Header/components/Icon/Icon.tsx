import { PAGES } from '@src/utils';
import { GameIcon, ChatIcon, MoreIcon, ShopIcon, StoriesIcon, MediaIcon, SettingsIcon } from '../';

export const Icon = (props) => {
  const { color, type } = props;

  return (
    <>
      {type === PAGES.GAME && <GameIcon color={color} />}
      {type === PAGES.CHAT && <ChatIcon color={color} />}
      {type === PAGES.SHOP && <ShopIcon color={color} />}
      {type === PAGES.MORE && <MoreIcon color={color} />}
      {type === PAGES.STORIES && <StoriesIcon color={color} />}
      {type === PAGES.MEDIA && <MediaIcon color={color} />}
      {type === PAGES.SETTINGS && <SettingsIcon color={color} />}
    </>
  );
};
