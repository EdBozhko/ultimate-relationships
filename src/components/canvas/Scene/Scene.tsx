'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr } from '@react-three/drei';
import { r3f } from '@src/helpers/global';
import * as THREE from 'three';

import type { SceneComponent } from './Scene.types.ts';

export const Scene: SceneComponent = ({ ...props }) => {
  return (
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
      <r3f.Out />
      <Preload all />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
};
