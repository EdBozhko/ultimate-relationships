/// <reference types="@react-three/fiber" />

import { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}

    interface IntrinsicElements {
      ambientLight: ThreeElements['ambientLight'];
      directionalLight: ThreeElements['directionalLight'];
      mesh: ThreeElements['mesh'];
      sphereGeometry: ThreeElements['sphereGeometry'];
      boxGeometry: ThreeElements['boxGeometry'];
      planeGeometry: ThreeElements['planeGeometry'];
      meshStandardMaterial: ThreeElements['meshStandardMaterial'];
    }
  }
}
