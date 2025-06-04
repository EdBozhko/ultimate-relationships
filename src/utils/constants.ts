export const PAGES = {
  GAME: 'game',
  CHAT: 'chat',
  SHOP: 'modifiers',
  MORE: 'more',

  STORIES: 'dirty-adventures',
  MEDIA: 'media',
  SETTINGS: 'settings',
  SIGN_UP: 'sign-up',
  CUSTOMIZE: 'customize',
} as const;

export type Pages = (typeof PAGES)[keyof typeof PAGES];

export const CONTROLS = {
  VR: 'vr',
  FULLSCREEN: 'fullscreen',
  INSTALL: 'install',
} as const;

export type Controls = (typeof CONTROLS)[keyof typeof CONTROLS];

export const SHOP_PAGES = {
  MODELS: 'models',
  TOYS: 'toys',
  POSES: 'poses',
  SCENES: 'scenes',
  OUTFITS: 'outfits',
} as const;

export const POSES_PAGES = {
  SINGLE: 'single',
  COUPLE: 'couple',
  TRIPLE: 'triple',
  GROUP: 'group',
};

export const MODELS_PAGES = {
  FEMALE: 'female',
  FURRY: 'furry',
  MALE: 'male',
  TRANS: 'trans',
};

export const USER_DATA = {
  NICK_NAME: 'nickName',
  AI_NICK_NAME: 'aiNickName',
  PREFERENCES: 'preferences',
  TYPE_OF_CONNECTION: 'typeOfConnection',
  CHARACTER_TEMPLATE: 'characterTemplate',
  TONE_TIPS: 'toneTips',
  TRAITS: 'traits',
  SUCCESS: 'success',
} as const;
