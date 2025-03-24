'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';

const StripClubModel = dynamic(() => import('@comp/Experience/StripClubModel'), { ssr: false });
const BasePartnerModel = dynamic(() => import('@comp/Experience/BasePartnerModel'), { ssr: false });

const MainExperience = () => {
  const { isPerfVisible } = useControls('perf', {
    isPerfVisible: true,
  });

  const camera = useThree((state) => state.camera);

  return (
    <>
      {isPerfVisible && <Perf position='top-left' />}

      <Suspense fallback={null}>
        <axesHelper args={[5]} />
        <cameraHelper args={[camera]} />

        <OrbitControls
          makeDefault
          minDistance={5}
          maxDistance={40}
          screenSpacePanning={true}
          maxPolarAngle={Math.PI / 2}
        />

        <ambientLight intensity={1.5} />

        <StripClubModel />
        <BasePartnerModel />
      </Suspense>
    </>
  );
};

export default MainExperience;
