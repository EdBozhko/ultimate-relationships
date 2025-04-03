import type { SVGProps, FC } from 'react';

export interface SettingsIconProps extends SVGProps<SVGSVGElement> {
  color: string;
}

export interface SettingsIconComponent extends FC<SettingsIconProps> {}
