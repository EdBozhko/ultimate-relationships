'use client';

import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { MutableRefObject } from 'react';

interface BoxHelperProps {
  (mesh: MutableRefObject<THREE.Object3D>, color?: string): null;
}

export const useBoxHelper: BoxHelperProps = (mesh, color = 'red') => {
  useHelper(mesh, THREE.BoxHelper, color);
  return null;
};
