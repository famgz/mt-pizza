import IconComponent from '@/icons/IconComponent';

export default function CircleCheck({ size, stroke, className }) {
  constd = 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
