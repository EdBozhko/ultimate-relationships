'use client';

import dynamic from 'next/dynamic';
import { Container } from './Customize.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading';

import type { CustomizeComponent } from './Customize.types.ts';

const CustomizeView = dynamic(() => import('@comp/canvas/CustomizeView').then((mod) => mod.CustomizeView), {
  ssr: false,
});

export const Customize: CustomizeComponent = () => {
  return (
    <Container>
      <PageHeading textContent='Customize' />
      <CustomizeView />
    </Container>
  );
};
