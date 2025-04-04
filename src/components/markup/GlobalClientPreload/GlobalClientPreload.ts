'use client';

import { useGLTF } from '@react-three/drei';

export const GlobalClientPreload = () => {
  useGLTF.preload('/models/base_partner/base_partner.glb');
  useGLTF.preload('/models/strip_club/strip_club.glb');

  return null;
};
