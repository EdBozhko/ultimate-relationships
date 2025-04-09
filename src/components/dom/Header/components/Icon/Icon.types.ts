import { FC } from 'react';
import { PAGES } from '@src/utils';

export interface IconProps {
  color: string;
  type: (typeof PAGES)[keyof typeof PAGES];
}

export type IconComponent = FC<IconProps>;

export type IconMap = Record<string, FC<{ color: string }>>;
