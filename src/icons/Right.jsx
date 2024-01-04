import IconComponent from '@/icons/IconComponent';

export default function Right({ size, stroke, className }) {
  const d =
    'm12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
