'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { r3f } from '@src/helpers/global';
import * as THREE from 'three';

import type { SceneComponent } from './Scene.types.ts';

export const Scene: SceneComponent = ({ ...props }) => {
  return (
    <Canvas
      {...props}
      gl={{
        powerPreference: 'high-performance',
        antialias: false, // MSAA off — большой выигрыш
        // alpha: false, // фон непрозрачный — дешевле
        depth: true,
        stencil: false,
        preserveDrawingBuffer: false,
      }}
      dpr={[1, 1.5]} // ограничиваем DPR
      // frameloop='demand' // рендер только по invalidate()
      shadows={false} // временно без теней; см. ниже
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
    >
      <r3f.Out />
      <Preload all />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
};
