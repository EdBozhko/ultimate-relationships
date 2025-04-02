export const ChatIcon = (props) => {
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
        <style>{`.cls-2{fill: ${color}}`}</style>
      </defs>
      <title />
      <path
        d='M285.27 339.5v-26.23a17.92 17.92 0 0 0-17.92-17.92H158.74a17.91 17.91 0 0 1-17.91-17.91v-87a17.91 17.91 0 0 1 17.91-17.92h194.52a17.91 17.91 0 0 1 17.91 17.92v87a17.91 17.91 0 0 1-17.91 17.91h-12.15a17.92 17.92 0 0 0-12 4.62Z'
        style={{
          fill: 'none',
          stroke: color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 15,
        }}
      />
      <circle cx={205.13} cy={231.68} r={15.36} className='cls-2' />
      <circle cx={256} cy={231.68} r={15.36} className='cls-2' />
      <circle cx={306.87} cy={231.68} r={15.36} className='cls-2' />
    </svg>
  );
};
