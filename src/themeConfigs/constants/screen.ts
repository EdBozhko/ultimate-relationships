export const BREAKPOINTS = {
  mobileScreenWidth: 360,
  tabletScreenWidth: 768,
  laptopScreenWidth: 1024,
  hdScreenWidth: 1280,
  mediumScreenWidth: 1440,
  fullHdScreenWidth: 1920,
  qhdScreenWidth: 2560,
  uhdScreenWidth: 3840,
};

export const SCREENS = {
  mobile: `(min-width: ${BREAKPOINTS.mobileScreenWidth}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tabletScreenWidth}px)`,
  laptop: `(min-width: ${BREAKPOINTS.laptopScreenWidth}px)`,
  hd: `(min-width: ${BREAKPOINTS.hdScreenWidth}px)`,
  medium: `(min-width: ${BREAKPOINTS.mediumScreenWidth}px)`,
  fullHd: `(min-width: ${BREAKPOINTS.fullHdScreenWidth}px)`,
  qhd: `(min-width: ${BREAKPOINTS.qhdScreenWidth}px)`,
  uhd: `(min-width: ${BREAKPOINTS.uhdScreenWidth}px)`,
};
