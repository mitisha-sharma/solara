import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell
} from 'recharts';
import { mockEnergyData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-md text-xs">
      <p className="font-semibold text-ink-700 mb-1">{label}</p>
      <p className="text-ink-500">
        Output: <span className="font-semibold text-ink-900">{payload[0]?.value} kWh</span>
      </p>
    </div>
  );
};

export default function PerformanceChart({ height = 220 }) {
  const max = Math.max(...mockEnergyData.weekly.map(d => d.kwh));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={mockEnergyData.weekly}
        margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
        barSize={28}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F0F2F5', radius: 6 }} />
        <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
          {mockEnergyData.weekly.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.kwh === max ? '#3B5BDB' : '#C7D2FE'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}