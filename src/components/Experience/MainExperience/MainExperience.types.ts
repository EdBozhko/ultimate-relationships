import type { FC } from 'react';
import type { PerspectiveCamera } from 'three';
import type { JSX } from 'react';

export type ModelComponentProps = Partial<JSX.IntrinsicElements['mesh']>;

export interface MainExperienceProps {}

export type MainExperienceComponent = FC<MainExperienceProps>;

export type PerspectiveCameraProps = PerspectiveCamera;
