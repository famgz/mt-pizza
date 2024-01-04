export default function IconComponent({
  d,
  size = 24,
  stroke = 'currentColor',
  className = '',
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke={stroke}
      className={className}
      height={size}
      width={size}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={d} />
    </svg>
  );
}
