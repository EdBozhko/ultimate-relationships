'use client';

import dynamic from 'next/dynamic';
import * as THREE from 'three';

import type { GameComponent } from './Game.types.ts';
import { useCallback, useState } from 'react';

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

  const onFaceUpdate = useCallback((faceMesh: THREE.SkinnedMesh) => {
    setFaceMeshData(faceMesh);
  }, []);

  return (
    <>
      <GameView orbitControls>
        <StripClubModel cameraTarget={faceMeshData} />
        <BasePartnerModel onFaceUpdate={onFaceUpdate} scale={1.5} position={[3.895, 1.159, -5.343]} />
        <Common />
      </GameView>
    </>
  );
};
