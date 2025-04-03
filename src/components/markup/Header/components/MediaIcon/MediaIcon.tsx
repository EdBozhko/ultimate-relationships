import type { MediaIconComponent } from './MediaIcon.types.ts';

export const MediaIcon: MediaIconComponent = (props) => {
  const { color } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      preserveAspectRatio='none'
      viewBox='0 0 32 32'
      {...props}
    >
      <g fill={color}>
        <path d='M1.5 32h29c.827 0 1.5-.673 1.5-1.5v-29c0-.827-.673-1.5-1.5-1.5h-29C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5zM31 30.5a.5.5 0 0 1-.5.5H27v-5h4v4.5zm0-5.5h-4v-5h4v5zm0-6h-4v-6h4v6zm0-7h-4V7h4v5zm-.5-11a.5.5 0 0 1 .5.5V6h-4V1h3.5zM26 1v30H6V1h20zM1 1.5a.5.5 0 0 1 .5-.5H5v5H1V1.5zM1 7h4v5H1V7zm0 6h4v6H1v-6zm0 7h4v5H1v-5zm0 6h4v5H1.5a.5.5 0 0 1-.5-.5V26z' />
        <path d='M15.502 18.944c.279 0 .555-.08.795-.231l3.494-2.192c.44-.276.702-.751.702-1.271s-.262-.994-.702-1.271l-3.494-2.192a1.495 1.495 0 0 0-.795-.231c-.828 0-1.502.674-1.502 1.502v4.384c0 .828.674 1.502 1.502 1.502zM15 13.058c0-.31.261-.502.502-.502a.49.49 0 0 1 .264.078l3.494 2.192c.211.133.233.341.233.424s-.022.291-.233.424l-3.494 2.192c-.297.186-.766.006-.766-.424v-4.384z' />
      </g>
    </svg>
  );
};
