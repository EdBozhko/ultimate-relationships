export const ArrowIcon = (props) => {
  const { color } = props;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 32 32' {...props}>
      <path
        d='M28.73 23.36a1 1 0 0 1-.71-.29L16.71 11.76a1 1 0 0 0-1.42 0L4 23.07a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.41l11.3-11.32a3.08 3.08 0 0 1 4.24 0l11.32 11.32a1 1 0 0 1-.71 1.7Z'
        data-name='arrow up'
        style={{
          fill: color,
        }}
      />
    </svg>
  );
};
