import { FC } from 'react';
import { Pages, Controls } from '@src/utils/constants.ts';

export interface IconProps {
  color: string;
  type: Pages | Controls;
}

export type IconComponent = FC<IconProps>;

export type IconMap = Record<string, FC<{ color: string }>>;
