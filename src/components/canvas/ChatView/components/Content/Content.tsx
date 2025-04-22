'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useThree } from '@react-three/fiber';

const BasePartnerModel = dynamic(
  () => import('@src/components/canvas/BasePartnerModel/').then((mod) => mod.BasePartnerModel),
  {
    ssr: false,
  },
);

const Common = dynamic(() => import('@src/components/canvas/View/View.tsx').then((mod) => mod.Common), { ssr: false });

export const Content = () => {
  const camera = useThree((state) => state.camera);

  const [partnerModelFace, setPartnerModelFace] = useState(null!);

  useEffect(() => {
    if (partnerModelFace?.position) {
      // console.log(partnerModelFace?.position);
      // camera.position.copy(partnerModelFace.position);
      // camera.position.x += 1.5;
      // camera.position.y += 1;
      // camera.position.z += 5;
    }
  }, [partnerModelFace?.position]);

  return (
    <>
      <BasePartnerModel
        scale={0.5}
        position={[0, 0.5, 0.75]}
        rotation={[Math.PI * -0.5, 0, 0]}
        onFaceUpdate={setPartnerModelFace}
      />
      <Common ambientLightIntensity={1.9} />
    </>
  );
};
