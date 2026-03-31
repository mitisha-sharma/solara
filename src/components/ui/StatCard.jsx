import clsx from 'clsx';

export default function StatCard({
  label, value, unit, subtext, subtextColor,
  icon: Icon, accent = false, className, children
}) {
  return (
    <div className={clsx(
      's-card p-5 relative overflow-hidden',
      className
    )}>
      {/* Faint watermark icon */}
      {Icon && (
        <div className="absolute right-4 top-4 text-ink-200 pointer-events-none">
          <Icon size={40} strokeWidth={1} />
        </div>
      )}

      <div className="relative z-10">
        {/* Label */}
        <p className="s-label mb-3">{label}</p>

        {/* Value */}
        <div className="flex items-end gap-1.5 mb-1">
          <span className={clsx(
            'text-3xl font-extrabold leading-none',
            accent ? 'text-primary' : 'text-ink-900'
          )}>
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-ink-400 mb-0.5">{unit}</span>
          )}
        </div>

        {/* Subtext */}
        {subtext && (
          <p className={clsx(
            'text-xs font-medium mt-1',
            subtextColor ?? 'text-ink-500'
          )}>
            {subtext}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}