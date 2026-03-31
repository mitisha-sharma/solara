import { Zap, TrendingUp, CheckCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import EnergyChart from '../components/charts/EnergyChart';
import Badge from '../components/ui/Badge';
import { mockEnergyData, mockWeather } from '../data/mockData';

const siteStatuses = [
  { name: 'Array A – North Wing', status: 'healthy' },
  { name: 'Array B – Central',    status: 'healthy' },
  { name: 'Storage Unit 1',       status: 'warning' },
  { name: 'DC/AC Inverter 4',     status: 'healthy' },
];

export default function Prediction() {
  const t = mockEnergyData.tomorrow;

  return (
    <div className="animate-fade-in">
      <PageHeader
        sectionLabel="AI Forecast"
        title="Energy Forecast"
        description="AI-driven predictive analysis for the upcoming week based on current atmospheric conditions and historical array performance."
      >
        {/* Live output chip */}
        <div className="s-card flex items-center gap-3 px-4 py-2.5">
          <div className="w-8 h-8 rounded-full bg-status-greenBg border border-status-greenBorder flex items-center justify-center">
            <Zap size={14} className="text-status-green" />
          </div>
          <div>
            <p className="s-label">Live Output</p>
            <p className="text-sm font-extrabold text-ink-900">14.2 kW</p>
          </div>
        </div>
      </PageHeader>

      <div className="grid lg:grid-cols-[1fr_280px] gap-5">

        {/* ── Left ── */}
        <div className="space-y-5">

          {/* Weekly chart */}
          <div className="s-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-ink-900">Weekly Performance</h2>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"/>Predicted
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-300 inline-block"/>Actual
                </span>
              </div>
            </div>
            <EnergyChart height={260} />
          </div>

          {/* Weather metrics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: '☀️',
                label: 'Sunlight Intensity',
                value: '82%',
                badge: 'OPTIMAL',
                badgeVariant: 'blue',
              },
              {
                icon: '🌡️',
                label: 'Ambient Temp',
                value: '75°F',
                badge: null,
              },
              {
                icon: '☁️',
                label: 'Cloud Coverage',
                value: '10%',
                badge: null,
              },
            ].map(({ icon, label, value, badge, badgeVariant }) => (
              <div key={label} className="s-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{icon}</span>
                  {badge && <Badge label={badge} variant={badgeVariant ?? 'blue'} />}
                </div>
                <p className="s-label mb-1">{label}</p>
                <p className="text-2xl font-extrabold text-ink-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right ── */}
        <div className="space-y-4">

          {/* Recommendations */}
          <div className="s-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">✦</span>
              <h3 className="text-sm font-bold text-ink-900">Recommendations</h3>
            </div>

            {/* Tilt adjustment */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-bold text-ink-900">Tilt Adjustment</p>
                  <p className="text-xs text-ink-400">Optimal angle for spring solstice.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xs text-ink-400 font-semibold uppercase tracking-wide">Recommended</p>
                  <p className="text-2xl font-extrabold text-primary">35°</p>
                </div>
              </div>
              {/* Slider visual */}
              <div className="relative mt-3 h-1.5 bg-border rounded-full">
                <div className="absolute left-0 top-0 h-full w-[65%] bg-primary rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm" style={{ left: 'calc(65% - 8px)' }} />
              </div>
            </div>

            {/* Scheduled cleaning */}
            <div className="p-3 rounded-lg bg-page border border-border">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">🧹</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Scheduled Cleaning</p>
                  <p className="text-xs text-ink-500 mt-0.5">Next recommended in</p>
                  <p className="text-sm font-extrabold text-primary mt-0.5">4 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Site status */}
          <div className="s-card p-5">
            <p className="s-label mb-3">Site Status</p>
            <div className="space-y-2">
              {siteStatuses.map(site => (
                <div key={site.name} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <span className={site.status === 'warning' ? 's-dot-yellow' : 's-dot-green'} />
                    <span className="text-xs font-medium text-ink-700">{site.name}</span>
                  </div>
                  <Badge
                    label={site.status === 'warning' ? 'WARNING' : 'HEALTHY'}
                    variant={site.status === 'warning' ? 'warning' : 'healthy'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carbon offset card */}
          <div className="rounded-xl overflow-hidden relative h-36">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-emerald-800 to-green-900" />
            {/* Aerial photo overlay effect */}
            <div className="absolute inset-0 opacity-40"
              style={{ background: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=60") center/cover' }} />
            <div className="relative z-10 p-4 h-full flex flex-col justify-end">
              <p className="text-2xs text-white/60 font-semibold tracking-widest uppercase mb-1">Carbon Offset</p>
              <p className="text-2xl font-extrabold text-white">12.4 Tons CO2</p>
              <p className="text-xs text-white/70 mt-0.5">Equivalent to planting 620 trees this year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}