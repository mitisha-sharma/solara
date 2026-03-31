export default function SolarLoader({ message = 'Analyzing...', sub = 'Using AI vision model' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-14">
      {/* Spinner ring */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full bg-primary-50 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-ink-900">{message}</p>
        <p className="text-xs text-ink-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}