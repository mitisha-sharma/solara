import { Sunrise, Sunset, Zap, Radio, Moon } from 'lucide-react';
import clsx from 'clsx';
import { useSky, fmtHour } from '../../context/SkyContext';

// SVG space per variant: horizon at HY, the path is half an ellipse centred on CX.
const GEO = {
  band: { W: 1000, H: 300, HY: 250, CX: 500, RX: 400, RY: 190, px0: 130, pn: 11 },
  hero: { W: 640,  H: 420, HY: 372, CX: 320, RX: 268, RY: 290, px0: 70,  pn: 7  },
};
const STARS = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 193) % 1000, y: 12 + ((i * 71) % 150), r: 0.6 + (i % 3) * 0.5,
}));

export default function SunArc({ variant = 'band', className }) {
  const { hour, live, scrub, goLive, sky } = useSky();
  const isHero = variant === 'hero';
  const { W, H, HY, CX, RX, RY, px0, pn } = GEO[variant] ?? GEO.band;
  const at = (th) => ({ x: CX - RX * Math.cos(th), y: HY - RY * Math.sin(th) });
  const PANELS = Array.from({ length: pn }, (_, i) => px0 + i * 74);

  const isDay = hour >= 6 && hour <= 18;
  // At night the moon takes the same arc, 12 hours later.
  const showSun = hour >= 5 && hour <= 19.2; // sun stays visible through twilight, moon once it is dark
  const bodyHour = showSun ? hour : hour < 6 ? hour + 12 : hour - 12;
  const th = (Math.PI * (bodyHour - 6)) / 12;
  const body = at(th);
  const f = sky.factor;
  const mw = (1.2 * f).toFixed(2);
  const rgb = (c) => `rgb(${c.join(',')})`;

  return (
    <div
      className={clsx('relative overflow-hidden select-none', isHero ? 'h-[400px] rounded-[28px]' : 'h-[236px] rounded-3xl', className)}
      style={{
        background: `linear-gradient(180deg, ${rgb(sky.top)} 0%, ${rgb(sky.bottom)} 100%)`,
        boxShadow: '0 20px 50px -20px rgba(11,27,58,0.55), inset 0 0 0 1px rgba(255,255,255,0.25)',
        transition: 'background 0.4s linear',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0%" stopColor="#FFE9A0" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFBE1F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFBE1F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* stars */}
        <g opacity={sky.night}>
          {STARS.map((s, i) => <circle key={i} cx={(s.x * W) / 1000} cy={s.y} r={s.r} fill="#fff" opacity={0.5 + (i % 4) * 0.12} />)}
        </g>

        {/* full path + travelled path */}
        <path d={`M${CX - RX} ${HY} A${RX} ${RY} 0 0 1 ${CX + RX} ${HY}`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
        {isDay && (
          <path d={`M${CX - RX} ${HY} A${RX} ${RY} 0 0 1 ${CX + RX} ${HY}`} pathLength="100" fill="none" stroke="#FFBE1F" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={`${((bodyHour - 6) / 12) * 100} 200`} style={{ filter: 'drop-shadow(0 0 6px rgba(255,190,31,0.9))' }} />
        )}

        {/* hour ticks */}
        {[6, 9, 12, 15, 18].map((h) => {
          const p = at((Math.PI * (h - 6)) / 12);
          const end = h === 6 ? 'start' : h === 18 ? 'end' : 'middle';
          return <text key={h} x={p.x + (h === 6 ? 6 : h === 18 ? -6 : 0)} y={h === 12 ? p.y - 14 : p.y + (h === 6 || h === 18 ? -14 : -12)} textAnchor={end} fontSize={isHero ? 16 : 13} fontWeight="600" fill="#fff" fillOpacity="0.8">{`${String(h).padStart(2, '0')}:00`}</text>;
        })}

        {/* sun / moon */}
        {showSun ? (
          <g transform={`translate(${body.x} ${body.y})`}>
            <circle r="95" fill="url(#sunGlow)" />
            <circle r="23" fill="#FFD04D" stroke="#FFF3B8" strokeWidth="3" />
          </g>
        ) : (
          <g transform={`translate(${body.x} ${body.y})`}>
            <circle r="60" fill="#BFD4FF" opacity="0.18" />
            <circle r="18" fill="#EAF1FF" />
            <circle cx="7" cy="-4" r="15" fill={rgb(sky.top)} />
          </g>
        )}

        {/* ground + solar array */}
        <rect x="-3000" y={HY} width="7000" height="400" fill="#0B1B3A" />
        <rect x="-3000" y={HY} width="7000" height="3" fill="#F5A623" opacity={0.25 + f * 0.75} />
        {PANELS.map((x, i) => (
          <g key={x}>
            <polygon points={`${x},${HY} ${x + 14},${HY - 26} ${x + 62},${HY - 26} ${x + 48},${HY}`}
              fill={`rgba(30,64,175,${0.9 - f * 0.25})`} stroke={`rgba(255,190,31,${0.25 + f * 0.75})`} strokeWidth="1.5"
              style={{ filter: `drop-shadow(0 0 ${2 + f * 10}px rgba(255,190,31,${f * 0.9}))` }} />
            <line x1={x + 7} y1={HY - 13} x2={x + 55} y2={HY - 13} stroke="#fff" strokeOpacity={0.15 + f * 0.25} />
            {i % 2 === 0 && <line x1={x + 31} y1={HY - 26} x2={x + 24} y2={HY} stroke="#fff" strokeOpacity={0.15 + f * 0.25} />}
          </g>
        ))}
      </svg>

      {/* readout */}
      <div className={clsx('absolute left-4 top-4 flex flex-wrap gap-2', isHero && 'left-6 top-6')}>
        <div className="rounded-2xl bg-white/70 backdrop-blur-md px-3 py-1.5 shadow-sm border border-white/60">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-500 flex items-center gap-1">
            {showSun ? <Sunrise size={11} /> : <Moon size={11} />} {showSun ? 'Sun position' : 'Night'}
          </p>
          <p className="font-display text-lg font-extrabold text-ink-900 leading-tight">{fmtHour(hour)}</p>
        </div>
        <div className="rounded-2xl bg-white/70 backdrop-blur-md px-3 py-1.5 shadow-sm border border-white/60">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-500 flex items-center gap-1"><Zap size={11} /> Output</p>
          <p className="font-display text-lg font-extrabold text-ink-900 leading-tight">{mw}<span className="text-xs font-semibold text-ink-500 ml-1">MW</span></p>
        </div>
        <div className={clsx('rounded-2xl bg-white/70 backdrop-blur-md px-3 py-1.5 shadow-sm border border-white/60', isHero ? 'hidden' : 'hidden xl:block')}>
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-ink-500 flex items-center gap-1"><Sunset size={11} /> Daylight</p>
          <p className="font-display text-lg font-extrabold text-ink-900 leading-tight">06:00<span className="text-ink-400 mx-1">–</span>18:00</p>
        </div>
      </div>

      {/* time scrubber */}
      <div className="absolute left-3 right-3 bottom-2 flex items-center gap-3 rounded-full bg-black/30 backdrop-blur-md px-3 py-1.5">
        <input
          type="range" min="0" max="23.99" step="0.05" value={hour}
          onChange={(e) => scrub(parseFloat(e.target.value))}
          aria-label="Time of day" className="sun-range flex-1"
        />
        <button onClick={goLive} className={clsx('flex items-center gap-1 text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors', live ? 'bg-sun-400 text-primary-900' : 'bg-white/20 text-white hover:bg-white/30')}>
          <Radio size={11} /> {live ? 'Live' : 'Go live'}
        </button>
      </div>
    </div>
  );
}
