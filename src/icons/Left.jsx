import IconComponent from '@/icons/IconComponent';

export default function Left({ size, stroke, className }) {
  const d =
    'm11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
