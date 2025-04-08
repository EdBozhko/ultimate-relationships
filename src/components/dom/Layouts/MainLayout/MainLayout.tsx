'use client';

import {
  useRef,
  // useEffect
} from 'react';
import dynamic from 'next/dynamic';
import { Leva } from 'leva';
import useGlobalStore from '@src/stores/useGlobalStore';

import type { MainLayoutComponent } from './MainLayout.types.ts';

const Scene = dynamic(() => import('@comp/canvas/Scene').then((mod) => mod.Scene), { ssr: false });

export const MainLayout: MainLayoutComponent = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null!);

  // const debugMode = useGlobalStore((store) => store.debugMode);
  // const debugPerfMode = useGlobalStore((store) => store.debugPerfMode);
  // const userMode = useGlobalStore((store) => store.userMode);
  // const userPerfMode = useGlobalStore((store) => store.userPerfMode);
  const isDebugMode = useGlobalStore((store) => store.isDebugMode);

  // useEffect(() => {
  //   const search = typeof window !== 'undefined' ? window.location.search : '';
  //   const searchParams = new URLSearchParams(search);

  //   if (Boolean(searchParams.get('debug-mode-on'))) {
  //     debugMode();
  //   }
  //   if (Boolean(searchParams.get('debug-perf-mode-on'))) {
  //     debugPerfMode();
  //   }
  //   if (Boolean(searchParams.get('debug-mode-off'))) {
  //     userMode();
  //   }
  //   if (Boolean(searchParams.get('debug-perf-mode-off'))) {
  //     userPerfMode();
  //   }
  // }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {children}
      <Leva collapsed hidden={!isDebugMode} />
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        shadows={true}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  );
};
