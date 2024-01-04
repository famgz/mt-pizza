import IconComponent from '@/icons/IconComponent';

export default function Plus({ size, stroke, className }) {
  const d = 'M12 4.5v15m7.5-7.5h-15';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
