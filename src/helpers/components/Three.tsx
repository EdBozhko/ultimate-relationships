'use client';

import { r3f } from '@src/helpers/global';

import type { ThreeComponent } from './Three.types.ts';

export const Three: ThreeComponent = ({ children }) => {
  return <r3f.In>{children}</r3f.In>;
};
