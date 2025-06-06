'use client';
import dynamic from 'next/dynamic';

const CustomizeViewStyled = dynamic(() => import('./CustomizeView.styles.ts').then((mod) => mod.CustomizeViewStyled), {
  ssr: false,
});

const Content = dynamic(() => import('./components/Content').then((mod) => mod.Content), {
  ssr: false,
});

export const CustomizeView = () => {
  return (
    <CustomizeViewStyled orbitControls>
      <Content />
    </CustomizeViewStyled>
  );
};
