import type { InstallIconComponent } from './InstallIcon.types.ts';

export const InstallIcon: InstallIconComponent = (props) => {
  const { color } = props;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 36 36' {...props}>
      <title>{'install-line'}</title>
      <path
        fill={color}
        d='M30.92 8h-4.37a1 1 0 0 0 0 2H31v20H5V10h4.38a1 1 0 0 0 0-2h-4.3A2 2 0 0 0 3 10v20a2 2 0 0 0 2.08 2h25.84A2 2 0 0 0 33 30V10a2 2 0 0 0-2.08-2Z'
        className='clr-i-outline clr-i-outline-path-1'
      />
      <path
        fill={color}
        d='m10.3 18.87 7 6.89a1 1 0 0 0 1.4 0l7-6.89a1 1 0 0 0-1.4-1.43L19 22.65V4a1 1 0 0 0-2 0v18.65l-5.3-5.21a1 1 0 0 0-1.4 1.43Z'
        className='clr-i-outline clr-i-outline-path-2'
      />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  );
};
