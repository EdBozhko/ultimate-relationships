'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

const BasePartnerModel = dynamic(
  () => import('@src/components/canvas/BasePartnerModel/').then((mod) => mod.BasePartnerModel),
  {
    ssr: false,
  },
);

const Common = dynamic(() => import('@src/components/canvas/View/View.tsx').then((mod) => mod.Common), { ssr: false });

export const Content = () => {
  const camera = useThree((state) => state.camera);

  const [partnerModelFace, setPartnerModelFace] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!partnerModelFace?.position) return;
    console.log(camera);

    // console.log(partnerModelFace?.position);
    // camera.position.copy(partnerModelFace.position);
    // camera.position.x += 1.5;
    // camera.position.y += 1;
    // camera.position.z += 5;
  }, [partnerModelFace]);

  return (
    <>
      <BasePartnerModel
        scale={0.5}
        position={window.matchMedia(SCREENS.fullHd).matches ? [0, 0.25, 0.65] : [0, -0.25, 0.5]}
        rotation={
          window.matchMedia(SCREENS.fullHd).matches ? [Math.PI * -0.5, Math.PI * 0.1, 0] : [Math.PI * -0.5, 0, 0]
        }
        onFaceUpdate={setPartnerModelFace}
      />
      <Common ambientLightIntensity={1.9} />
    </>
  );
};
