'use client';

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { Three } from '@src/helpers/components/Three';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import useGlobalStore from '@src/stores/useGlobalStore';

import type { PerspectiveCameraProps, CommonComponent, ViewComponent, ViewProps } from './View.types.ts';

export const Common: CommonComponent = ({ ambientLightIntensity = 1.5, color }) => {
  const isDebugMode = useGlobalStore((store) => store.isDebugMode);

  const camera = useThree((state) => state.camera as PerspectiveCameraProps);

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}

      {isDebugMode && camera && camera.projectionMatrix?.elements?.[0] !== undefined && (
        <>
          <axesHelper args={[5]} />
          {/* <cameraHelper args={[camera]} /> */}
        </>
      )}
      <ambientLight intensity={ambientLightIntensity} />

      <PerspectiveCamera makeDefault fov={45} near={0.1} far={200} position={[0, 0, 0]} />
    </Suspense>
  );
};

const View: ViewComponent = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, orbitControls = false, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null!);
    useImperativeHandle(ref, () => localRef.current);

    const isDebugMode = useGlobalStore((store) => store.isDebugMode);
    const isDebugPerfMode = useGlobalStore((store) => store.isDebugPerfMode);

    const { isPerfVisible } = useControls('perf', {
      isPerfVisible: true,
    });

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>
          <ViewImpl track={localRef}>
            {isDebugPerfMode || (isDebugMode && isPerfVisible) ? <Perf position='top-left' /> : null}
            {children}
            {orbitControls && (
              <OrbitControls
                makeDefault
                minDistance={1}
                maxDistance={10}
                screenSpacePanning={true}
                maxPolarAngle={Math.PI / 2}
              />
            )}
          </ViewImpl>
        </Three>
      </>
    );
  },
);
View.displayName = 'View';

export { View };
