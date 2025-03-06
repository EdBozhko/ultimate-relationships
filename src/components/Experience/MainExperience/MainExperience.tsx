'use client';

import { OrbitControls, useHelper } from '@react-three/drei';
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';
import { useRef, Suspense } from 'react';
import { DirectionalLight, DirectionalLightHelper } from 'three';

const MainExperience = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightRef, DirectionalLightHelper, 1);

  const { isPerfVisible } = useControls('debug', {
    isPerfVisible: true,
  });

  return (
    <>
      {isPerfVisible && <Perf position='top-left' />}

      <Suspense fallback={null}>
        <OrbitControls makeDefault />

        <directionalLight ref={directionalLightRef} castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh castShadow visible={true} position={[-2, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={'#ff0000'} />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>

        <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color='greenyellow' />
        </mesh>
      </Suspense>
    </>
  );
};

export default MainExperience;
