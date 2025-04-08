'use client';

import { useEffect } from 'react';
import { BREAKPOINTS } from '@src/themeConfigs/constants/screen';

export const useViewportHeightFix = (): null => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth >= BREAKPOINTS.tabletScreenWidth) return;

    const updateVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    updateVh();

    window.addEventListener('resize', updateVh);

    return () => window.removeEventListener('resize', updateVh);
  }, []);

  return null;
};
