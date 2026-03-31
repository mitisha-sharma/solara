import { useState } from 'react';
import { Droplets, Sliders, AlertTriangle, Calendar, Sun, CheckCircle, ChevronRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import { mockRecommendations } from '../data/mockData';
import clsx from 'clsx';

const iconMap = {
  droplets:         Droplets,
  sliders:          Sliders,
  'alert-triangle': AlertTriangle,
  calendar:         Calendar,
  sun:              Sun,
};

const typeStyle = {
  cleaning:    { bg: 'bg-status-blueBg',   border: 'border-status-blueBorder',   icon: 'text-status-blue'   },
  tilt:        { bg: 'bg-primary-50',      border: 'border-primary-200',         icon: 'text-primary'       },
  fault:       { bg: 'bg-status-redBg',    border: 'border-status-redBorder',    icon: 'text-status-red'    },
  schedule:    { bg: 'bg-status-greenBg',  border: 'border-status-greenBorder',  icon: 'text-status-green'  },
  performance: { bg: 'bg-status-yellowBg', border: 'border-status-yellowBorder', icon: 'text-status-yellow' },
};

function RecCard({ rec, done, onToggle }) {
  const Icon   = iconMap[rec.icon] ?? Sun;
  const styles = typeStyle[rec.type] ?? typeStyle.performance;

  return (
    <div className={clsx(
      's-card p-4 flex items-start gap-4 transition-all duration-200',
      done && 'opacity-40'
    )}>
      {/* Icon */}
      <div className={clsx(
        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border',
        styles.bg, styles.border
      )}>
        <Icon size={16} className={styles.icon} />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 justify-between mb-1">
          <h3 className={clsx('text-sm font-bold text-ink-900', done && 'line-through')}>{rec.title}</h3>
          <Badge label={rec.priority} variant={rec.priority} />
        </div>
        <p className="text-xs text-ink-500 leading-relaxed mb-2.5">{rec.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xs font-bold text-status-green bg-status-greenBg border border-status-greenBorder px-2 py-0.5 rounded">
            📈 {rec.impact}
          </span>
          <span className="text-2xs text-ink-400">Effort: {rec.effort}</span>
          <span className="text-2xs text-ink-400 flex items-center gap-1">
            <Calendar size={10} /> {rec.timeframe}
          </span>
        </div>
      </div>

      {/* Done toggle */}
      <button
        onClick={() => onToggle(rec.id)}
        className={clsx(
          'w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 mt-0.5',
          done
            ? 'bg-status-green border-status-green text-white'
            : 'border-border text-transparent hover:border-status-green hover:text-status-green'
        )}
      >
        <CheckCircle size={14} />
      </button>
    </div>
  );
}

export default function Recommendations() {
  const [done, setDone] = useState([]);
  const toggle = id => setDone(p => p.includes(id) ? p.filter(x => x!==id) : [...p, id]);

  const high   = mockRecommendations.filter(r => r.priority === 'high');
  const others = mockRecommendations.filter(r => r.priority !== 'high');

  return (
    <div className="animate-fade-in max-w-2xl">
      <PageHeader
        sectionLabel="Smart Actions"
        title="Maintenance & Recommendations"
        description="AI-generated action plan ranked by impact. Mark items complete as you action them."
      />

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'High Priority', count: high.length,                    color: 'text-status-red'   },
          { label: 'Total Actions', count: mockRecommendations.length,     color: 'text-ink-900'      },
          { label: 'Completed',     count: done.length,                    color: 'text-status-green' },
        ].map(({ label, count, color }) => (
          <div key={label} className="s-card p-4 text-center">
            <p className={clsx('text-2xl font-extrabold', color)}>{count}</p>
            <p className="text-xs text-ink-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* High priority */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} className="text-status-red" />
          <h2 className="text-sm font-bold text-ink-900">High Priority</h2>
          <Badge label="Urgent" variant="high" />
        </div>
        <div className="space-y-2.5">
          {high.map(rec => (
            <RecCard key={rec.id} rec={rec} done={done.includes(rec.id)} onToggle={toggle} />
          ))}
        </div>
      </section>

      {/* Other */}
      <section>
        <h2 className="text-sm font-bold text-ink-900 mb-3">Other Recommendations</h2>
        <div className="space-y-2.5">
          {others.map(rec => (
            <RecCard key={rec.id} rec={rec} done={done.includes(rec.id)} onToggle={toggle} />
          ))}
        </div>
      </section>
    </div>
  );
}