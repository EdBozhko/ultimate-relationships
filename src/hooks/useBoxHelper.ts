'use client';

import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { MutableRefObject } from 'react';

export const useBoxHelper = (mesh: MutableRefObject<THREE.Object3D>, color: string = 'red'): void => {
  useHelper(mesh, THREE.BoxHelper, color);
};
