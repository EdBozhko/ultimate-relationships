/// <reference types="@react-three/fiber" />

import { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {} // 🔥 Наследуем все стандартные 3D-элементы

    // Дополнительно можно явно указать кастомные элементы, если TypeScript всё ещё ругается
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
