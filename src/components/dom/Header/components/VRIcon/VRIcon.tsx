import { VRIconComponent } from './VRIcon.types.ts';

export const VRIcon: VRIconComponent = (props) => {
  const { color } = props;

  return (
    <svg
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      id='Icons'
      viewBox='0 0 32 32'
      {...props}
    >
      <style>
        {`.st0{fill:none;stroke:${color};stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}`}
      </style>
      <path
        d='M3 11v10c0 1.1.9 2 2 2h6.2c.5 0 1-.2 1.4-.6l2-2c.8-.8 2-.8 2.8 0l2 2c.4.4.9.6 1.4.6H27c1.1 0 2-.9 2-2V11c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2z'
        className='st0'
      />
      <circle cx={9} cy={16} r={3} className='st0' />
      <circle cx={23} cy={16} r={3} className='st0' />
    </svg>
  );
};
