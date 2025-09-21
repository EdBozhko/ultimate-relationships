'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
// import { useThree } from '@react-three/fiber';
import { SCREENS } from '@themeConfigs/constants/screen.ts';
import { useControls } from 'leva';

const BasePartnerModel = dynamic(
  () => import('@src/components/canvas/BasePartnerModel/').then((mod) => mod.BasePartnerModel),
  {
    ssr: false,
  },
);

const Common = dynamic(() => import('@src/components/canvas/View/View.tsx').then((mod) => mod.Common), { ssr: false });

export const Content = ({ currentAnimation }: { currentAnimation?: string }) => {
  // const camera = useThree((state) => state.camera);

  const [spotLightDistance, setSpotLightDistance] = useState(0.95);

  const refs = {
    spotLight: useRef<THREE.SpotLight>(null!),
  };

  const spotLightDebug = useControls('spotLight', {
    color: '#ffffff',
    penumbra: { min: 0, max: 1, step: 0.1, value: 1 },
    intensity: { min: 0, max: 100, step: 1, value: 7 },
    angle: { min: 0, max: Math.PI / 2, step: 0.01, value: 0.5 },
    decay: { min: -2, max: 2, step: 1, value: 0 },
  });

  const [partnerModelFace, setPartnerModelFace] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!partnerModelFace?.position) return;
    setSpotLightDistance(0.95);
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
        position={window.matchMedia(SCREENS.laptop).matches ? [-0.12, 0.1, 0.7] : [0, 0.5, 0.75]}
        rotation={
          window.matchMedia(SCREENS.laptop).matches ? [Math.PI * -0.47, Math.PI * 0, 0] : [Math.PI * -0.5, 0, 0]
        }
        onFaceUpdate={setPartnerModelFace}
        currentAnimation={currentAnimation}
      />
      <Common ambientLightIntensity={1.9} />
      <spotLight
        ref={refs.spotLight}
        color={spotLightDebug.color}
        // castShadow
        angle={spotLightDebug.angle}
        penumbra={spotLightDebug.penumbra}
        decay={spotLightDebug.decay}
        intensity={spotLightDebug.intensity}
        distance={spotLightDistance}
      />
    </>
  );
};
