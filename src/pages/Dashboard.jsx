import { Zap, TrendingUp, Wind, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StatCard from '../components/ui/StatCard';
import PageHeader from '../components/ui/PageHeader';
import PerformanceChart from '../components/charts/PerformanceChart';
import Badge from '../components/ui/Badge';
import { mockDashboardStats, mockWeather, mockEnergyData } from '../data/mockData';

const tabs = ['Daily', 'Weekly', 'Monthly'];

const sitePerformance = [
  { name: 'Site Alpha – Mojave',  output: 452, bars: [0.6,0.8,0.7,0.9,1.0,0.8,0.9], color: '#3B5BDB' },
  { name: 'Site Beta – Sonora',   output: 389, bars: [0.4,0.6,0.5,0.7,0.8,0.6,0.5], color: '#94A3B8' },
  { name: 'Site Gamma – Sahra',   output: 412, bars: [0.5,0.7,0.6,0.8,0.9,0.7,0.6], color: '#F59E0B' },
];

function MiniBarChart({ bars, color }) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: i === bars.length - 1 ? 1 : 0.4 + i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const s = mockDashboardStats;
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <div className="space-y-5 animate-fade-in">

      {/* ── Header ── */}
      <PageHeader
        sectionLabel="System Status"
        title="Optimal Performance"
        meta={
          <>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-status-green">
              <span className="s-dot-green animate-pulse-dot" />
              All Systems Operational
            </span>
            <span className="text-ink-300">|</span>
            <span className="text-xs text-ink-400">Updated 2 mins ago</span>
          </>
        }
      >
        {/* Alerts chip */}
        <div className="flex items-center gap-3 s-card px-4 py-2.5 border-l-4 border-l-status-green">
          <CheckCircle size={16} className="text-status-green" />
          <div>
            <p className="text-2xs font-bold uppercase tracking-wide text-ink-400">Alerts</p>
            <p className="text-xs font-semibold text-ink-700">No issues detected</p>
          </div>
        </div>
      </PageHeader>

      {/* ── Top stat row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Efficiency */}
        <StatCard label="Efficiency" value={`${s.systemEfficiency}`} unit="%">
          <p className="text-xs font-semibold text-status-green mt-2 flex items-center gap-1">
            <TrendingUp size={11} /> +2.4% from last month
          </p>
        </StatCard>

        {/* Current Output */}
        <StatCard label="Current Output" value="1.2" unit="MW">
          <p className="text-xs text-ink-400 mt-2 flex items-center gap-1.5">
            <span className="s-dot-blue animate-pulse-dot" />
            Live data streaming
          </p>
        </StatCard>

        {/* Performance Score */}
        <div className="s-card p-5">
          <p className="s-label mb-3">Performance Score</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold text-primary">A+</span>
            <div className="w-10 h-10 rounded-full border-2 border-primary-200 flex items-center justify-center">
              <CheckCircle size={18} className="text-primary" />
            </div>
          </div>
          <div className="s-progress mt-3">
            <div className="s-progress-fill" style={{ width: '96%' }} />
          </div>
          <p className="text-xs text-ink-400 mt-1.5">Top 2% of network clusters</p>
        </div>
      </div>

      {/* ── Chart + Site Performance ── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Main chart */}
        <div className="lg:col-span-2 s-card p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-base font-bold text-ink-900">Network Yield Trends</h2>
              <p className="text-xs text-ink-400 mt-0.5">Combined generation across active arrays</p>
            </div>
            {/* Tab switcher */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === t
                      ? 'bg-primary text-white'
                      : 'bg-surface text-ink-500 hover:bg-page'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <PerformanceChart height={240} />
          </div>
        </div>

        {/* Site Performance */}
        <div className="s-card p-5">
          <h2 className="text-base font-bold text-ink-900 mb-4">Site Performance</h2>
          <div className="space-y-3">
            {sitePerformance.map(site => (
              <div key={site.name} className="flex items-center justify-between p-3 rounded-lg bg-page border border-border hover:border-primary-200 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-semibold text-ink-800 truncate">{site.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{site.output} kW Output</p>
                </div>
                <MiniBarChart bars={site.bars} color={site.color} />
              </div>
            ))}
          </div>

          {/* Register new site */}
          <button className="mt-3 w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-border hover:border-primary-300 hover:bg-primary-50 text-primary text-sm font-semibold transition-all">
            <Plus size={14} />
            Register New Site
          </button>
        </div>
      </div>

      {/* ── Panel Grid ── */}
      <div className="s-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink-900">Array Status</h2>
            <p className="text-xs text-ink-400 mt-0.5">{s.totalPanels} panels monitored</p>
          </div>
          <div className="flex gap-4 text-xs text-ink-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-status-green inline-block opacity-80"/>Clean ({s.cleanPanels})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-status-yellow inline-block opacity-80"/>Dirty ({s.dirtyPanels})
            </span>
          </div>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5">
          {Array.from({ length: s.totalPanels }, (_, i) => {
            const isDirty = [2,3,7,14,17,22].includes(i);
            const isFault = i === 14;
            return (
              <div
                key={i}
                title={`Panel ${String.fromCharCode(65+Math.floor(i/6))}${(i%6)+1}`}
                className={`aspect-square rounded flex items-center justify-center text-2xs font-bold cursor-pointer hover:scale-110 transition-transform border
                  ${isFault  ? 'bg-status-redBg    border-status-redBorder   text-status-red'
                  : isDirty  ? 'bg-status-yellowBg border-status-yellowBorder text-status-yellow'
                  :            'bg-status-greenBg  border-status-greenBorder  text-status-green'}`}
              >
                {isFault ? '!' : isDirty ? '~' : '✓'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}