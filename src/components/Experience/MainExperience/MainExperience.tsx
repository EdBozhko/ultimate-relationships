'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import type { FC } from 'react';
import type { PerspectiveCamera } from 'three';

import useGlobalStore from '@src/stores/useGlobalStore';

type ModelComponentProps = Partial<JSX.IntrinsicElements['mesh']>;

const StripClubModel = dynamic(() => import('@comp/Experience/StripClubModel'), {
  ssr: false,
}) as FC<ModelComponentProps>;
const BasePartnerModel = dynamic(() => import('@comp/Experience/BasePartnerModel'), {
  ssr: false,
}) as FC<ModelComponentProps>;

const MainExperience: FC = () => {
  const isDebugMode = useGlobalStore((state) => state.isDebugMode);
  const isDebugPerfMode = useGlobalStore((state) => state.isDebugPerfMode);

  const { isPerfVisible } = useControls('perf', {
    isPerfVisible: true,
  });

  const camera = useThree((state) => state.camera as PerspectiveCamera);

  return (
    <>
      {isDebugPerfMode || (isDebugMode && isPerfVisible) ? <Perf position='top-left' /> : null}

      <Suspense fallback={null}>
        {isDebugMode && (
          <>
            <axesHelper args={[5]} />
            <cameraHelper args={[camera]} />
          </>
        )}

        <OrbitControls
          makeDefault
          minDistance={1}
          maxDistance={10}
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
