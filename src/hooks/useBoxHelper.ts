'use client';

import * as THREE from 'three';
import { useHelper } from '@react-three/drei';

export const useBoxHelper = (mesh, color = 'red') => {
  useHelper(mesh, THREE.BoxHelper, color);
};
