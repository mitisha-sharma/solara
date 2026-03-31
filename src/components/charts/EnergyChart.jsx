import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';
import { mockEnergyData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-md text-xs">
      <p className="font-semibold text-ink-700 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            <span className="text-ink-500">{p.name}</span>
          </span>
          <span className="font-semibold text-ink-900">{p.value} kW</span>
        </div>
      ))}
    </div>
  );
};

export default function EnergyChart({ height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={mockEnergyData.hourly} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="lineGradBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#3B5BDB" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          iconType="circle"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="optimal"
          name="Optimal"
          stroke="#E2E8F0"
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
          activeDot={false}
        />
        <Line
          type="monotone"
          dataKey="actual"
          name="Actual"
          stroke="#CBD5E1"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#64748B', strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted"
          stroke="#3B5BDB"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#3B5BDB', strokeWidth: 2, stroke: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}