import type { MoreIconComponent } from './MoreIcon.types.ts';

export const MoreIcon: MoreIconComponent = (props) => {
  const { color } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='Layer_1'
      preserveAspectRatio='none'
      data-name='Layer 1'
      viewBox='105 110 300 300'
      {...props}
    >
      <defs>
        <style>{`.cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:15px}`}</style>
      </defs>
      <title />
      <rect width={180.83} height={49.25} x={207.48} y={175.98} className='cls-1' rx={24.62} ry={24.62} />
      <circle cx={148.57} cy={203.45} r={24.88} className='cls-1' />
      <rect width={180.83} height={49.25} x={207.48} y={283.66} className='cls-1' rx={24.62} ry={24.62} />
      <circle cx={148.57} cy={311.14} r={24.88} className='cls-1' />
    </svg>
  );
};
