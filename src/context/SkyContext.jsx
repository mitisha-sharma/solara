/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Sky colour keyframes by hour: [hour, top rgb, bottom rgb]
const KEYS = [
  [0,    [7, 11, 31],     [20, 34, 79]],
  [5,    [27, 37, 89],    [107, 79, 143]],
  [6.5,  [245, 158, 107], [255, 215, 160]],
  [9,    [91, 168, 240],  [191, 227, 255]],
  [12,   [59, 148, 238],  [169, 218, 255]],
  [16,   [90, 163, 234],  [205, 230, 250]],
  [18.5, [232, 112, 74],  [255, 194, 122]],
  [20,   [43, 42, 107],   [138, 79, 125]],
  [22,   [11, 18, 48],    [28, 43, 102]],
  [24,   [7, 11, 31],     [20, 34, 79]],
];

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export function skyAt(hour) {
  let i = KEYS.findIndex((k, idx) => hour >= k[0] && hour <= KEYS[idx + 1][0]);
  if (i < 0) i = KEYS.length - 2;
  const [h0, t0, b0] = KEYS[i];
  const [h1, t1, b1] = KEYS[i + 1];
  const t = (hour - h0) / (h1 - h0);
  // Sun elevation: sunrise 06:00, noon 12:00, sunset 18:00
  const elev = Math.sin((Math.PI * (hour - 6)) / 12);
  return {
    top: mix(t0, t1, t),
    bottom: mix(b0, b1, t),
    elev,
    factor: clamp(elev),              // 0 at night -> 1 at noon
    night: clamp((-elev + 0.1) * 3),  // 0 in daylight -> 1 deep night
  };
}

export const fmtHour = (h) => {
  const hh = Math.floor(h) % 24;
  const mm = Math.floor((h - Math.floor(h)) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
};

const nowHour = () => {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
};

const SkyContext = createContext(null);

export function SkyProvider({ children }) {
  const [hour, setHour] = useState(nowHour);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => setHour(nowHour()), 30000);
    return () => clearInterval(id);
  }, [live]);

  const scrub = useCallback((h) => { setLive(false); setHour(h); }, []);
  const goLive = useCallback(() => { setLive(true); setHour(nowHour()); }, []);
  const sky = useMemo(() => skyAt(hour), [hour]);

  // Expose the sky to plain CSS so panels, glows and the page tint follow the sun.
  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty('--sky-top', sky.top.join(' '));
    s.setProperty('--sky-bottom', sky.bottom.join(' '));
    s.setProperty('--sun-f', sky.factor.toFixed(3));
  }, [sky]);

  const value = useMemo(() => ({ hour, live, scrub, goLive, sky }), [hour, live, scrub, goLive, sky]);
  return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
}

export const useSky = () => useContext(SkyContext);
