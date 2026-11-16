import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SunArc from '../components/ui/SunArc';
import { mockEnergyData, mockDashboardStats } from '../data/mockData';
import './journal.css';

/* ── Photography: Wikimedia Commons (free licences). Credits are listed in the footer. ── */
const IMG = {
  hero:   { dir: 'e/ed', file: 'Villas_at_sunset_next_to_St%C3%A5ngehuvud_3.jpg', name: 'Villas at sunset next to Stångehuvud', alt: 'Houses glowing in low golden-hour sunlight' },
  farm:   { dir: 'e/e0', file: 'Solar_farm_at_Krishnapuram_Tatipudi_Water_Works_aerial_view_01.jpg', name: 'Solar farm at Krishnapuram, aerial view', alt: 'Aerial view of a solar farm' },
  sunset: { dir: '7/74', file: 'Solar_panel_in_the_sunset.jpg', name: 'Solar panel in the sunset', alt: 'A solar panel silhouetted against a sunset sky' },
  roofs:  { dir: '2/21', file: 'Rooftop_Solar_panels_on_homes_in_Mehsana%2C_Gujarat%2C_India.jpg', name: 'Rooftop solar panels on homes in Mehsana, Gujarat', alt: 'Rows of homes with rooftop solar panels' },
  cell:   { dir: 'a/a6', file: 'A_close-up_of_a_photovoltaic_cell_panel_attached_to_the_roof_of_a_house_for_an_experiment_to_convert_solar_energy_into_electricity._The_experiment_is_being_conducted_by_the_Engineer_-_DPLA_-_a08ce5d14c7c1e37beced568cc6c4968.jpeg', thumb: 'thumbnail.jpeg', name: 'Close-up of a photovoltaic cell panel on a roof', alt: 'Close-up of photovoltaic cells on a rooftop panel' },
  forest: { dir: '9/9a', file: 'Sunlight_in_the_forest.jpg', name: 'Sunlight in the forest', alt: 'Sunlight falling through a forest' },
  shafts: { dir: '6/62', file: 'Shafts_of_sunlight_through_trees_above_Dimples%2C_Macclesfield_Forest_-_geograph.org.uk_-_6711872.jpg', name: 'Shafts of sunlight through trees, Macclesfield Forest', alt: 'Shafts of sunlight through trees' },
};
const src = (k, w = 1280) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${IMG[k].dir}/${IMG[k].file}/${w}px-${IMG[k].thumb || IMG[k].file}`;
const page = (k) => `https://commons.wikimedia.org/wiki/File:${IMG[k].file}`;

const now = new Date();
const issue = now.toLocaleString('en', { month: 'long', year: 'numeric' });

const STORIES = [
  { k: 'farm',   cls: 'j-s1', cat: 'Outlook',    title: 'The Future of Solar Energy',                 text: 'From single rooftops to fields of panels, solar is becoming one of the most visible parts of the energy system.', to: '#insights' },
  { k: 'sunset', cls: 'j-s2', cat: 'Science',    title: 'How Solar Panels Turn Sunlight Into Power',  text: 'Light in, electricity out: a four-step journey from the Sun to your socket.', to: '#technology' },
  { k: 'roofs',  cls: 'j-s3', cat: 'Living',     title: 'Building a Sustainable Home',                text: 'Rooftops are quiet, unused real estate. Put them to work and keep them healthy.', to: '#explore' },
  { k: 'cell',   cls: 'j-s4', cat: 'Technology', title: 'The Technology Behind Photovoltaic Cells',   text: 'Thin layers of silicon, an electric field and a lot of patient engineering.', to: '#technology' },
  { k: 'forest', cls: 'j-s5', cat: 'Impact',     title: 'Why Renewable Energy Matters',               text: 'Every kilowatt-hour made from sunlight is one that does not need to be burned.', to: '#impact' },
];

const FEATURES = [
  { n: '01', title: 'Overview',    to: '/dashboard',       text: 'Live array status, yield trends, site performance and a panel-by-panel health grid.' },
  { n: '02', title: 'Analysis',    to: '/upload',          text: 'Upload a photograph of your array and scan it for dirt, damage and efficiency bottlenecks.' },
  { n: '03', title: 'Predictions', to: '/prediction',      text: 'An energy forecast for the week ahead, built from conditions and the array’s past performance.' },
  { n: '04', title: 'Maintenance', to: '/recommendations', text: 'A ranked action plan: what to clean or fix first, with items you can mark as done.' },
];

const NAV = [['Home', '#top'], ['Discover', '#discover'], ['Solar Insights', '#insights'], ['Technology', '#technology'], ['About', '#about']];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.j-reveal');
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Editorial line chart of the sample day in mockEnergyData */
function DayChart() {
  const d = mockEnergyData.hourly;
  const W = 620, H = 250, pad = { l: 34, r: 10, t: 10, b: 28 };
  const max = Math.ceil(Math.max(...d.map((p) => p.optimal)));
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (d.length - 1);
  const y = (v) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = (key) => d.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ');
  const area = `${line('actual')} L${x(d.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Sample day: actual, predicted and optimal output in kilowatts by hour" style={{ width: '100%', height: 'auto' }}>
      {Array.from({ length: max / 2 + 1 }, (_, i) => i * 2).map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#fff" strokeOpacity="0.12" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#fff" fillOpacity="0.6">{t}</text>
        </g>
      ))}
      <path d={area} fill="#A9B79A" fillOpacity="0.28" />
      <path d={line('optimal')} fill="none" stroke="#F2C94C" strokeWidth="2" />
      <path d={line('predicted')} fill="none" stroke="#A9B79A" strokeWidth="2" strokeDasharray="5 5" />
      <path d={line('actual')} fill="none" stroke="#FBF8F1" strokeWidth="2.5" />
      {d.map((p, i) => i % 2 === 0 && <text key={p.time} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#fff" fillOpacity="0.6">{p.time}</text>)}
    </svg>
  );
}

/* Four small diagrams for “The science behind solar” */
const Art = {
  sun: (
    <svg viewBox="0 0 240 150" aria-hidden="true">
      <circle cx="46" cy="40" r="20" fill="#F2C94C" />
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={70 + i * 4} y1={52 + i * 8} x2={150 + i * 8} y2={92 + i * 10} stroke="#F2C94C" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />)}
      <polygon points="120,128 232,100 232,116 130,146" fill="#1F3D2B" />
    </svg>
  ),
  cell: (
    <svg viewBox="0 0 240 150" aria-hidden="true">
      <rect x="40" y="22" width="160" height="22" fill="#2D5A40" /><rect x="40" y="44" width="160" height="30" fill="#6E8B72" /><rect x="40" y="74" width="160" height="40" fill="#1F3D2B" />
      <text x="46" y="38" fontSize="10" fill="#FBF8F1">glass + contacts</text><text x="46" y="63" fontSize="10" fill="#FBF8F1">n-type silicon</text><text x="46" y="98" fontSize="10" fill="#FBF8F1">p-type silicon</text>
      {[70, 110, 150].map((cx) => <g key={cx}><circle cx={cx} cy="58" r="4" fill="#F2C94C" /><path d={`M${cx} 66 L${cx} 90`} stroke="#F2C94C" strokeWidth="1.5" strokeDasharray="3 3" /></g>)}
    </svg>
  ),
  current: (
    <svg viewBox="0 0 240 150" aria-hidden="true">
      <rect x="30" y="40" width="180" height="70" rx="2" fill="none" stroke="#1F3D2B" strokeWidth="3" />
      {[50, 90, 130, 170].map((cx) => <circle key={cx} cx={cx} cy="40" r="5" fill="#F2C94C" />)}
      <path d="M96 66 L124 66 M114 58 L124 66 L114 74" stroke="#1F3D2B" strokeWidth="2.5" fill="none" />
      <rect x="86" y="100" width="68" height="20" fill="#DDE3D0" stroke="#1F3D2B" strokeWidth="2" /><text x="120" y="114" textAnchor="middle" fontSize="11" fill="#1F3D2B">inverter</text>
    </svg>
  ),
  home: (
    <svg viewBox="0 0 240 150" aria-hidden="true">
      <polygon points="40,78 120,28 200,78" fill="#1F3D2B" /><rect x="58" y="78" width="124" height="52" fill="#F6F1E7" stroke="#1F3D2B" strokeWidth="2" />
      <polygon points="78,60 112,40 124,48 90,68" fill="#2D5A40" stroke="#F2C94C" strokeWidth="1.5" />
      <rect x="76" y="92" width="26" height="26" fill="#F2C94C" /><rect x="132" y="92" width="34" height="38" fill="#A9B79A" />
    </svg>
  ),
};
const STEPS = [
  { art: 'sun',     t: 'Sunlight arrives',        p: 'Light leaves the Sun as particles called photons and reaches the panel about eight minutes later.' },
  { art: 'cell',    t: 'Cells absorb it',         p: 'In a thin layer of silicon, absorbed photons knock electrons loose across a built-in electric field.' },
  { art: 'current', t: 'Electricity flows',       p: 'The field pushes the electrons one way, creating direct current. An inverter turns it into the alternating current homes use.' },
  { art: 'home',    t: 'Power for the home',      p: 'Lights and appliances use it first. Any surplus can charge a battery or flow back to the grid.' },
];

export default function Journal() {
  const [open, setOpen] = useState(false);
  useReveal();
  const s = mockDashboardStats;
  const dayKwh = mockEnergyData.hourly.reduce((a, p) => a + p.actual, 0);

  return (
    <div className="j-root" id="top">
      <header className="j-nav">
        <div className="j-wrap j-nav-in">
          <a href="#top" className="j-logo">Solara <small>Solar Journal</small></a>
          <button className="j-menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
          <nav className={`j-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
            {NAV.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <Link to="/dashboard" className="j-cta">Explore Dashboard <ArrowRight size={14} /></Link>
          </nav>
        </div>
      </header>

      <section className="j-hero">
        <img src={src('hero', 1920)} alt={IMG.hero.alt} fetchPriority="high" />
        <div className="j-wrap j-hero-in">
          <div className="j-masthead"><span>The Sun Issue</span><span>{issue}</span></div>
          <h1>The future is <em>brighter</em> than we think.</h1>
          <div className="j-hero-foot">
            <p>Exploring the power of sunlight, sustainable living and the technology shaping tomorrow.</p>
            <a href="#discover" className="j-link-arrow">Explore the Journal <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="j-section" id="discover">
        <div className="j-wrap">
          <div className="j-section-head j-reveal">
            <div><span className="j-eyebrow">Featured stories</span><h2>Light, in five parts.</h2></div>
            <p>Five short reads on how sunlight becomes power, and why it matters.</p>
          </div>
          <div className="j-stories">
            {STORIES.slice(0, 4).map((st, i) => (
              <a key={st.title} href={st.to} className={`j-story ${st.cls} j-reveal j-d${i % 3}`}>
                <div className="ph"><img src={src(st.k)} alt={IMG[st.k].alt} loading="lazy" /></div>
                <span className="j-eyebrow cat">{st.cat}</span>
                <h3>{st.title}</h3><p>{st.text}</p><div className="meta">{issue}</div>
              </a>
            ))}
            <blockquote className="j-quote j-reveal">“Sunlight is the one energy source that arrives everywhere, every day, for free.”</blockquote>
            {STORIES.slice(4).map((st) => (
              <a key={st.title} href={st.to} className={`j-story ${st.cls} j-reveal`}>
                <div className="ph"><img src={src(st.k)} alt={IMG[st.k].alt} loading="lazy" /></div>
                <span className="j-eyebrow cat">{st.cat}</span>
                <h3>{st.title}</h3><p>{st.text}</p><div className="meta">{issue}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="j-section j-insights" id="insights">
        <div className="j-wrap">
          <div className="j-section-head j-reveal">
            <div><span className="j-eyebrow on-dark">Solar insights</span><h2>A sunny day, in numbers.</h2></div>
            <p>These figures come from the sample array that powers Solara’s demo dashboard. They are illustrative, not a real installation.</p>
          </div>
          <div className="j-figures">
            <div className="j-numbers">
              <div className="j-num j-reveal"><b>{dayKwh.toFixed(1)}<small>kWh</small></b><span>Energy generated across the sample day</span></div>
              <div className="j-num j-reveal j-d1"><b>{s.systemEfficiency}<small>%</small></b><span>System efficiency of the sample array</span></div>
              <div className="j-num j-reveal j-d2"><b>{s.monthOutput.toLocaleString('en')}<small>kWh</small></b><span>Generated over the sample month</span></div>
              <div className="j-num j-reveal j-d3"><b>{s.co2Saved}</b><span>CO₂ saved, as reported by the demo data</span></div>
            </div>
            <div className="j-chart j-reveal">
              <h4>Output across the day</h4>
              <p className="cap">Kilowatts, hour by hour. Sample data.</p>
              <DayChart />
              <div className="j-legend">
                <span><i style={{ borderColor: '#FBF8F1' }} />Actual</span>
                <span><i style={{ borderColor: '#A9B79A', borderTopStyle: 'dashed' }} />Predicted</span>
                <span><i style={{ borderColor: '#F2C94C' }} />Optimal</span>
              </div>
            </div>
          </div>
          <div className="j-sunband j-reveal">
            <span className="j-eyebrow on-dark">Follow the sun</span>
            <SunArc variant="band" />
            <p>Drag the slider to move through the day. Output here is illustrative, scaled to the 1.2 MW sample array used in the dashboard.</p>
          </div>
        </div>
      </section>

      <section className="j-section j-science" id="technology">
        <div className="j-wrap">
          <div className="j-section-head j-reveal">
            <div><span className="j-eyebrow">The science behind solar</span><h2>From sunbeam to socket.</h2></div>
            <p>Four steps, no moving parts. That is why panels are quiet, durable and simple to maintain.</p>
          </div>
          <div className="j-steps">
            {STEPS.map((st, i) => (
              <div key={st.t} className={`j-step j-reveal j-d${i % 3}`}>
                <div className="n">0{i + 1}</div>{Art[st.art]}<h4>{st.t}</h4><p>{st.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="j-impact" id="impact" style={{ backgroundImage: `url(${src('shafts', 1920)})` }}>
        <div className="j-wrap">
          <span className="j-eyebrow on-dark">Sustainability &amp; impact</span>
          <h2 className="j-reveal">Power that leaves the <em>forest</em> standing.</h2>
          <div className="j-facts">
            <div className="j-fact j-reveal"><b>8′20″</b><span>for sunlight to travel from the Sun to the Earth.</span></div>
            <div className="j-fact j-reveal j-d1"><b>15–22%</b><span>of that sunlight is turned into electricity by typical modern silicon panels.</span></div>
            <div className="j-fact j-reveal j-d2"><b>0</b><span>direct CO₂ emissions while a panel is generating electricity.</span></div>
          </div>
        </div>
      </section>

      <section className="j-section" id="explore">
        <div className="j-wrap">
          <div className="j-section-head j-reveal">
            <div><span className="j-eyebrow">Explore Solara</span><h2>Put the sun to work.</h2></div>
            <p>The Solara app turns these ideas into tools. Each one is live in the dashboard.</p>
          </div>
          <div className="j-explore-list">
            {FEATURES.map((f) => (
              <Link key={f.n} to={f.to} className="j-row j-reveal">
                <span className="n">{f.n}</span><h3>{f.title}</h3><p>{f.text}</p>
                <span className="go"><ArrowUpRight size={20} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="j-section j-about" id="about">
        <div className="j-wrap j-about-grid">
          <div className="j-reveal"><span className="j-eyebrow">About the project</span><h2 style={{ marginTop: 18 }}>A journal for people who like sunlight.</h2></div>
          <div className="j-reveal j-d1">
            <p>Solara is a solar monitoring project: a dashboard for array health, an image-based panel analysis tool, an energy forecast and a maintenance plan.</p>
            <p>The Solar Journal is its front page, a place to understand the ideas behind the tools. Numbers in the app and on this page are sample data used for demonstration.</p>
            <Link to="/login" className="j-link-arrow">Sign in to the dashboard <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <footer className="j-foot">
        <div className="j-wrap">
          <div className="j-foot-top">
            <div><a href="#top" className="j-logo">Solara <small style={{ color: 'var(--sage)' }}>Solar Journal</small></a><p className="big">Build for the light we already have.</p></div>
            <div><h5>Journal</h5><ul>{NAV.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul></div>
            <div><h5>App</h5><ul>{FEATURES.map((f) => <li key={f.n}><Link to={f.to}>{f.title}</Link></li>)}<li><a href="https://github.com/mitisha-sharma/solara" target="_blank" rel="noreferrer">Source on GitHub</a></li></ul></div>
          </div>
          <p className="j-credits">
            Photography from Wikimedia Commons, used under their free licences (see each file page for author and licence):{' '}
            {Object.keys(IMG).map((k, i, a) => <span key={k}><a href={page(k)} target="_blank" rel="noreferrer">{IMG[k].name}</a>{i < a.length - 1 ? ' · ' : '.'}</span>)}
          </p>
        </div>
      </footer>
    </div>
  );
}
