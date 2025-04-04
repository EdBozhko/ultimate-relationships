'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useGlobalStore from '@src/stores/useGlobalStore';

export const DebugClientFlags = () => {
  const searchParams = useSearchParams();

  const isDebugMode = Boolean(searchParams.get('debug-mode'));
  const isDebugPerfMode = Boolean(searchParams.get('debug-perf-mode'));

  const debugMode = useGlobalStore((state) => state.debugMode);
  const userMode = useGlobalStore((state) => state.userMode);
  const debugPerfMode = useGlobalStore((state) => state.debugPerfMode);
  const userPerfMode = useGlobalStore((state) => state.userPerfMode);

  useEffect(() => {
    if (isDebugMode) {
      debugMode();
    } else {
      userMode();
    }

    if (isDebugPerfMode) {
      debugPerfMode();
    } else {
      userPerfMode();
    }
  }, []);

  return null;
};
