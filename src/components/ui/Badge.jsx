import clsx from 'clsx';

const variantMap = {
  clean:    's-badge-green',
  healthy:  's-badge-green',
  dirty:    's-badge-yellow',
  warning:  's-badge-yellow',
  high:     's-badge-red',
  critical: 's-badge-red',
  urgent:   's-badge-red',
  medium:   's-badge-yellow',
  moderate: 's-badge-yellow',
  low:      's-badge-muted',
  blue:     's-badge-blue',
  info:     's-badge-blue',
  default:  's-badge-muted',
};

export default function Badge({ label, variant = 'default', className }) {
  return (
    <span className={clsx(variantMap[variant] ?? variantMap.default, className)}>
      {label}
    </span>
  );
}