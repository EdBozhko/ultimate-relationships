import type { FC } from 'react';
import type { PerspectiveCamera } from 'three';
import type { JSX } from 'react';

export type ModelComponentProps = Partial<JSX.IntrinsicElements['mesh']>;

export type MainExperienceComponent = FC;

export type PerspectiveCameraProps = PerspectiveCamera;
