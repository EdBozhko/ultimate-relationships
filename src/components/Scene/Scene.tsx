'use client';

import * as THREE from 'three';
import { Canvas, CanvasProps, useThree } from '@react-three/fiber';
import { Preload, AdaptiveDpr } from '@react-three/drei';
import { Leva } from 'leva';

const Scene = ({ children, ...props }: CanvasProps) => {
  return (
    <>
      <Leva collapsed />
      <Canvas
        {...props}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
        }}
        onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}
      >
        <AdaptiveDpr pixelated />
        <Preload all />
        {children}
      </Canvas>
    </>
  );
};

export default Scene;
