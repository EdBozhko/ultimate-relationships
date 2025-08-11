import { TooltipStyled } from './Tooltip.styles.tsx';

import type { TooltipComponent } from './Tooltip.types.ts';

export const Tooltip: TooltipComponent = ({ position }) => {
  return <TooltipStyled style={{ top: `${position.x}px`, left: `${position.y}px` }} />;
};
