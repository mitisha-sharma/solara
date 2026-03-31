export default function PageHeader({ sectionLabel, title, description, children, meta }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {sectionLabel && <p className="s-section-title">{sectionLabel}</p>}
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1 leading-tight">{title}</h1>
        {description && (
          <p className="text-sm text-ink-500 max-w-xl leading-relaxed">{description}</p>
        )}
        {meta && <div className="flex items-center gap-3 mt-2">{meta}</div>}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0 ml-4">{children}</div>
      )}
    </div>
  );
}