'use client';

import { Canvas, CanvasProps } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { ACESFilmicToneMapping } from 'three';
import { Leva } from 'leva';

const Scene = ({ children, ...props }: CanvasProps) => {
  return (
    <>
      <Leva />
      <Canvas
        {...props}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        onCreated={(state) => (state.gl.toneMapping = ACESFilmicToneMapping)}
      >
        <Preload all />
        {children}
      </Canvas>
    </>
  );
};

export default Scene;
