import IconComponent from '@/icons/IconComponent';

export default function Hamburger({ size, stroke, className }) {
  const d = 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
