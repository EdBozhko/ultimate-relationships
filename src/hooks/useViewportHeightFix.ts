'use client';

import { useLayoutEffect } from 'react';
import { BREAKPOINTS } from '@src/themeConfigs/constants/screen';

export const useViewportHeightFix = (): null => {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth >= BREAKPOINTS.tabletScreenWidth) return;

    const updateVh = () => {
      if (window) {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        // window.visualViewport?.addEventListener('resize', ()=>{})
        // document.body.style.height = `${window.visualViewport?.height}px`;
      }
    };

    updateVh();

    window.visualViewport?.addEventListener('resize', updateVh);

    return () => window.visualViewport?.removeEventListener('resize', updateVh);
  }, []);

  return null;
};
