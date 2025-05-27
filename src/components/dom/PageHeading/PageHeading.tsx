'use client';

import { PageHeadingStyled } from './PageHeading.styles';

import type { PageHeadingComponent } from './PageHeading.types.ts';

export const PageHeading: PageHeadingComponent = ({ textContent }) => {
  return <PageHeadingStyled>{textContent}</PageHeadingStyled>;
};
