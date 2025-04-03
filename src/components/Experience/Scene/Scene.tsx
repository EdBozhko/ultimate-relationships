'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr } from '@react-three/drei';
import { Leva } from 'leva';
import type { FC } from 'react';
import type { SceneProps } from './Scene.types.ts';

import useGlobalStore from '@src/stores/useGlobalStore';

const Scene: FC<SceneProps> = ({ children, ...props }) => {
  const isDebugMode = useGlobalStore((state) => state.isDebugMode);

  return (
    <>
      <Leva collapsed hidden={!isDebugMode} />
      <Canvas
        {...props}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <AdaptiveDpr pixelated />
        <Preload all />
        {children}
      </Canvas>
    </>
  );
};

export default Scene;
