import IconComponent from '@/icons/IconComponent';

export default function InfoCircle({ size, stroke, className }) {
  const d =
    'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z';

  return (
    <IconComponent d={d} size={size} stroke={stroke} className={className} />
  );
}
