import IconComponent from '@/icons/IconComponent';

export default function Check({ size, stroke, className }) {
  const d = 'm4.5 12.75 6 6 9-13.5';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
