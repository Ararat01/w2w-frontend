const Arrow = ({ color, rotate, size = 25 }) => {
  return (
    <svg
      style={{ transform: `rotateZ(${rotate}deg)` }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M${size / 5} ${size / 5} L${(5 * size) / 6} ${size / 2} L${
          size / 6
        } ${(5 * size) / 6}`}
        stroke={color}
        strokeWidth={(2 / 25) * size}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
