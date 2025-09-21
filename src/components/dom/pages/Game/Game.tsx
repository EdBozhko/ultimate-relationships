'use client';

import dynamic from 'next/dynamic';
import * as THREE from 'three';

import type { GameComponent } from './Game.types.ts';
import { useCallback, useState, useRef, useEffect } from 'react';

const StripClubModel = dynamic(
  () => import('@src/components/canvas/StripClubModel/').then((mod) => mod.StripClubModel),
  {
    ssr: false,
  },
);
const BasePartnerModel = dynamic(
  () => import('@src/components/canvas/BasePartnerModel/').then((mod) => mod.BasePartnerModel),
  {
    ssr: false,
  },
);
const GameView = dynamic(() => import('@comp/canvas/View/View.styles.ts').then((mod) => mod.GameView), {
  ssr: false,
});
const Common = dynamic(() => import('@src/components/canvas/View/View.tsx').then((mod) => mod.Common), { ssr: false });

export const Game: GameComponent = () => {
  const [faceMeshData, setFaceMeshData] = useState<THREE.SkinnedMesh>(null!);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onFaceUpdate = useCallback((faceMesh: THREE.SkinnedMesh) => {
    setFaceMeshData(faceMesh);
  }, []);

  const handler = () => {
    const el = audioRef.current;

    if (!el) return;

    el.volume = 0.5;

    if (el.paused) {
      // play() должен вызываться строго внутри жеста пользователя
      el.play().catch(() => {
        /* проглатываем, если что-то пошло не так */
      });
    }
    // если надо один раз — сразу снимаем обработчик
    document.body.removeEventListener('pointerdown', handler);
  };

  useEffect(() => {
    handler();
    // pointerdown лучше, чем click, для мобильных
    document.body.addEventListener('pointerdown', handler, { passive: true });
    document.body.addEventListener('click', handler, { passive: true });

    return () => {
      document.body.removeEventListener('pointerdown', handler);
      document.body.removeEventListener('click', handler);
    };
  }, []);

  useEffect(() => {
    handler();
  }, [audioRef]);

  return (
    <>
      <GameView orbitControls>
        <StripClubModel cameraTarget={faceMeshData} />
        <BasePartnerModel onFaceUpdate={onFaceUpdate} scale={1.5} position={[3.895, 1.159, -5.343]} />
        <Common />
      </GameView>
      <audio ref={audioRef} preload='auto' loop>
        <source src='/audio/song.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};
