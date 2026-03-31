import { Link } from 'react-router-dom';
import { Zap, Upload, TrendingUp, Wrench, Globe, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const stats = [
  { value: '98%',  label: 'EFFICIENCY' },
  { value: '2.4k', label: 'NODES'      },
  { value: '0.4s', label: 'LATENCY'    },
];

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <Navbar />

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        paddingTop: 56, // navbar height
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#F0F2F5',
      }}>

        {/* ── Rich layered background ── */}
        {/* Primary radial glow — right side blue */}
        <div style={{
          position: 'absolute',
          top: '10%', right: '-5%',
          width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,91,219,0.09) 0%, rgba(59,91,219,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        {/* Secondary glow — bottom left indigo */}
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-5%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}/>
        {/* Top left small accent */}
        <div style={{
          position: 'absolute',
          top: '5%', left: '8%',
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* Dot grid — full area */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #c8d0dc 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}/>

        {/* Horizontal accent lines */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.4) 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Content */}
        <div className="page-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* ── Left ── */}
            <div style={{ animation: 'fadeUp 0.7s ease forwards' }}>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 999,
                padding: '6px 14px',
                marginBottom: 32,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#22C55E',
                  display: 'inline-block',
                  boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
                  animation: 'pulseDot 2s ease-in-out infinite',
                }}/>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  Next-Gen Energy Intelligence
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: 58,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: 20,
                color: '#0F172A',
              }}>
                Welcome<br/>
                to{' '}
                <span style={{ color: '#3B5BDB' }}>Solara</span>
              </h1>

              <p style={{
                fontSize: 16,
                color: '#64748B',
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 420,
              }}>
                Intelligent solar optimization for a sustainable future.
                Maximize your generation with AI-driven precision.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 52, flexWrap: 'wrap' }}>
                <Link to="/dashboard" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#3B5BDB',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '13px 24px',
                  borderRadius: 10,
                  boxShadow: '0 4px 16px rgba(59,91,219,0.35)',
                  transition: 'all 0.15s',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2F4AC7'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,91,219,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#3B5BDB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,91,219,0.35)'; }}>
                  Explore Your Dashboard
                </Link>
                <Link to="/upload" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#fff',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '13px 24px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C7D2FE'; e.currentTarget.style.background = '#FAFBFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#fff'; }}>
                  How It Works
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 40 }}>
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: '#3B5BDB',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}>
                      {value}
                    </p>
                    <p style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#94A3B8',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — enhanced panel card visual ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: 'fadeIn 0.8s ease 0.3s forwards',
              opacity: 0,
            }}>

              {/* Decorative ring */}
              <div style={{
                position: 'absolute',
                width: 420, height: 420,
                borderRadius: '50%',
                border: '1px solid rgba(59,91,219,0.12)',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                pointerEvents: 'none',
              }}/>
              <div style={{
                position: 'absolute',
                width: 340, height: 340,
                borderRadius: '50%',
                border: '1px solid rgba(59,91,219,0.07)',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                pointerEvents: 'none',
              }}/>

              {/* Panel card */}
              <div style={{
                width: 340,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(15,23,42,0.18), 0 8px 20px rgba(59,91,219,0.12)',
                animation: 'float 6s ease-in-out infinite',
                position: 'relative',
              }}>
                {/* Top area — panel visual */}
                <div style={{
                  background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 35%, #1a3060 70%, #1e3a7a 100%)',
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Subtle inner glow */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 80% 20%, rgba(59,91,219,0.3) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}/>

                  {/* Sun */}
                  <div style={{
                    position: 'absolute', top: 22, right: 28,
                    width: 48, height: 48,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FEF08A 20%, #FBBF24 70%, #F59E0B 100%)',
                    boxShadow: '0 0 40px rgba(251,191,36,0.45), 0 0 80px rgba(251,191,36,0.15)',
                    zIndex: 2,
                  }}/>

                  {/* Panel cells */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 7,
                    marginTop: 12,
                    position: 'relative', zIndex: 1,
                  }}>
                    {Array.from({ length: 9 }, (_, i) => (
                      <div key={i} style={{
                        height: 48,
                        borderRadius: 6,
                        background: 'linear-gradient(145deg, #0c1f4a 0%, #142d68 100%)',
                        border: '1px solid rgba(59,91,219,0.35)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        {/* Cell lines */}
                        <div style={{
                          position: 'absolute',
                          top: '50%', left: 0, right: 0,
                          height: 1,
                          background: 'rgba(59,91,219,0.2)',
                        }}/>
                        <div style={{
                          position: 'absolute',
                          left: '50%', top: 0, bottom: 0,
                          width: 1,
                          background: 'rgba(59,91,219,0.2)',
                        }}/>
                        {/* Shimmer on select cells */}
                        {[1,5,8].includes(i) && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(99,130,255,0.12) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: `shimmer ${2.5 + i*0.4}s linear infinite`,
                          }}/>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Live generation */}
                  <div style={{ marginTop: 22, position: 'relative', zIndex: 1 }}>
                    <p style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 3,
                    }}>
                      Live Generation
                    </p>
                    <p style={{
                      color: '#fff',
                      fontSize: 28, fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}>
                      14.2 kW
                    </p>
                  </div>

                  {/* Zap icon bottom right */}
                  <div style={{
                    position: 'absolute', bottom: 20, right: 20,
                    width: 34, height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <Zap size={15} color="rgba(255,255,255,0.85)" />
                  </div>
                </div>

                {/* Bottom status bar */}
                <div style={{
                  background: '#fff',
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F1F5F9',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#22C55E', display: 'inline-block',
                      boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
                    }}/>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>System Online</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>84.3% eff.</span>
                </div>
              </div>

              {/* Carbon saved chip */}
              <div style={{
                position: 'absolute',
                top: 20, right: -10,
                background: '#fff',
                borderRadius: 14,
                padding: '10px 16px',
                boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
                border: '1px solid #E2E8F0',
                animation: 'float 7s ease-in-out infinite',
                animationDelay: '1.5s',
                zIndex: 20,
              }}>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                  color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4,
                }}>
                  Carbon Saved
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#F0FDF4', border: '1px solid #BBF7D0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12,
                  }}>🌱</div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>1,240 Tons</span>
                </div>
              </div>

              {/* Bottom left chip — efficiency */}
              <div style={{
                position: 'absolute',
                bottom: 30, left: -20,
                background: '#fff',
                borderRadius: 12,
                padding: '8px 14px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                border: '1px solid #E2E8F0',
                animation: 'float 9s ease-in-out infinite',
                animationDelay: '3s',
                zIndex: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: '#EEF2FF', border: '1px solid #C7D2FE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TrendingUp size={14} color="#3B5BDB" />
                  </div>
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 1 }}>AI Score</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>A+ Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, transparent, rgba(240,242,245,0.8))',
          pointerEvents: 'none',
        }}/>
      </section>

      {/* ── Precision Engineering Section ─────────────────────────── */}
      <section style={{
        background: '#fff',
        borderTop: '1px solid #E2E8F0',
        padding: '80px 0',
        position: 'relative',
      }}>
        {/* Subtle top dot-grid */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}/>

        <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 30, fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#0F172A', marginBottom: 12,
            }}>
              Precision Engineering
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, maxWidth: 460 }}>
              Every watt accounted for. Our optimization engine leverages real-time atmospheric data
              and machine learning to ensure your arrays operate at peak performance 24/7.
            </p>
          </div>

          {/* Feature cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

            {/* Predictive Analysis — col span 2 */}
            <div style={{
              gridColumn: 'span 2',
              background: '#FAFBFF',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: '28px 28px 24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#EEF2FF', border: '1px solid #C7D2FE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Activity size={17} color="#3B5BDB" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                Predictive Analysis
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, maxWidth: 340 }}>
                Anticipate energy shifts before they happen with our weather-integrated forecasting models.
              </p>
              {/* Mini line chart decoration */}
              <div style={{ position: 'absolute', right: 24, bottom: 24, opacity: 0.15 }}>
                <svg width="160" height="60" viewBox="0 0 160 60">
                  <polyline
                    points="0,50 22,38 44,44 68,20 90,28 110,10 136,16 160,4"
                    fill="none" stroke="#3B5BDB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Instant Response — accent blue */}
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3B5BDB 50%, #4f46e5 100%)',
              borderRadius: 16,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Zap size={17} color="white" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                Instant Response
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
                Sub-second monitoring and load balancing across your entire energy ecosystem.
              </p>
              <button style={{
                width: '100%', padding: '10px 0',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 8,
                color: '#fff',
                fontSize: 13, fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                backdropFilter: 'blur(4px)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                Learn more
              </button>
            </div>

            {/* Smart Maintenance */}
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 16,
              padding: '24px',
              textAlign: 'center',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#FEF3C7',
                border: '2px solid #FDE68A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}>
                <Wrench size={18} color="#F59E0B" />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Smart Maintenance</h3>
              <p style={{ fontSize: 12, color: '#78716C', lineHeight: 1.55 }}>
                Automated diagnostic alerts sent directly to your maintenance team.
              </p>
            </div>

            {/* Global Optimization — col span 2 */}
            <div style={{
              gridColumn: 'span 2',
              background: '#FAFBFF',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                  Global Optimization
                </h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                  Solara connects systems worldwide, learning from every sunrise to improve yours.
                </p>
              </div>
              {/* Map visual */}
              <div style={{
                width: 140, height: 88,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                <svg viewBox="0 0 140 88" style={{ width: '100%', height: '100%' }}>
                  {/* World dots */}
                  {[
                    [14,18],[24,16],[36,20],[52,18],[64,16],[76,20],[88,18],[100,16],[118,20],
                    [20,30],[32,28],[48,26],[60,30],[72,26],[86,28],[98,30],[112,26],
                    [26,40],[42,38],[62,40],[78,36],[94,38],[110,40],
                    [30,52],[50,48],[70,52],[88,48],[106,50],
                  ].map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="1.8" fill="#38BDF8" opacity={0.6 + (i%3)*0.15}/>
                  ))}
                  {/* Connection lines */}
                  {[[24,16,76,20],[52,18,98,30],[20,30,72,26],[42,38,94,38]].map(([x1,y1,x2,y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38BDF8" strokeWidth="0.6" opacity="0.35"/>
                  ))}
                  {/* Pulse circles */}
                  {[[52,18],[72,26],[50,48]].map(([cx,cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="4" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.4"/>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer style={{
        background: '#fff',
        borderTop: '1px solid #E2E8F0',
        padding: '40px 0 32px',
      }}>
        <div className="page-container">
          <p style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#3B5BDB',
            marginBottom: 16,
          }}>SOLARA</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 20 }}>
            {['Privacy Policy','Terms of Service','API Docs','Contact'].map(l => (
              <a key={l} href="#" style={{
                fontSize: 11, fontWeight: 500,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.target.style.color = '#374151'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            {['🌐','🔗','✉️'].map((icon, i) => (
              <button key={i} style={{
                width: 32, height: 32, borderRadius: 8,
                border: '1px solid #E2E8F0',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {icon}
              </button>
            ))}
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: 11,
            color: '#CBD5E1',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            © 2024 Solara Energy Systems. Precision Optimization.
          </p>
        </div>
      </footer>
    </div>
  );
}