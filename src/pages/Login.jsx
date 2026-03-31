import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, CheckCircle, TrendingUp, Shield } from 'lucide-react';

// Fake credentials for demo
const DEMO_EMAIL    = 'admin@solara.io';
const DEMO_PASSWORD = 'solara2025';

const stats = [
  { value: '98%',  label: 'System Efficiency'  },
  { value: '14.2', label: 'kW Live Output'      },
  { value: '1,240',label: 'Tons CO₂ Saved'      },
];

const features = [
  { icon: TrendingUp, text: 'AI-powered energy forecasting'     },
  { icon: Shield,     text: 'Real-time fault detection'         },
  { icon: CheckCircle,text: 'Smart cleaning recommendations'    },
];

// Animated solar panel SVG card component
function SolarPanelCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: 320,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '0.5s',
      }}
    >
      {/* Panel background */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(135deg, #0d1b3e 0%, #0f2855 40%, #1a3a6c 100%)',
          padding: '28px 24px 24px',
          minHeight: 200,
        }}
      >
        {/* Sun */}
        <div
          className="absolute"
          style={{
            top: 20, right: 30,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FDE68A 30%, #FBBF24 100%)',
            boxShadow: '0 0 30px rgba(251,191,36,0.5)',
            animation: 'pulseDot 3s ease-in-out infinite',
          }}
        />

        {/* Panel grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              style={{
                height: 44,
                borderRadius: 5,
                background: 'linear-gradient(135deg, #0a1f4e 0%, #112660 100%)',
                border: '1px solid rgba(59,91,219,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shimmer effect on some cells */}
              {[0,4,7].includes(i) && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(59,91,219,0.15) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: `shimmer ${2 + i * 0.3}s linear infinite`,
                }}/>
              )}
            </div>
          ))}
        </div>

        {/* Live generation badge */}
        <div style={{ marginTop: 20 }}>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 2,
          }}>
            Live Generation
          </p>
          <p style={{
            color: '#fff',
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            14.2 kW
          </p>
        </div>

        {/* Bottom right icon */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={14} color="rgba(255,255,255,0.8)" />
        </div>
      </div>

      {/* Carbon saved floating chip — positioned outside card */}
      <div
        style={{
          position: 'absolute',
          top: -12, right: -16,
          background: '#fff',
          borderRadius: 12,
          padding: '8px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          border: '1px solid #E2E8F0',
          animation: 'float 7s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      >
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 2 }}>
          Carbon Saved
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: '#F0FDF4', border: '1px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11,
          }}>🌱</div>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>1,240 Tons</span>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [rememberMe,  setRememberMe]  = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        navigate('/home');
      } else {
        setLoading(false);
        setError('Invalid credentials. Try admin@solara.io / solara2025');
      }
    }, 1200);
  };

  const handleDemoLogin = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL — Branding & Visual ── */}
      <div
        className="bg-login-left"
        style={{
          flex: '0 0 52%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating blobs */}
        <div className="blob" style={{
          width: 280, height: 280,
          background: 'rgba(99,102,241,0.18)',
          top: -60, right: -60,
        }}/>
        <div className="blob blob-2" style={{
          width: 200, height: 200,
          background: 'rgba(59,130,246,0.15)',
          bottom: 40, left: -40,
        }}/>
        <div className="blob blob-3" style={{
          width: 140, height: 140,
          background: 'rgba(16,185,129,0.12)',
          bottom: 120, right: 80,
        }}/>

        {/* Dot grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}/>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 420 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <Zap size={18} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', lineHeight: 1 }}>
                Solara
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                Optimization Engine
              </p>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{
              color: '#fff',
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: 14,
            }}>
              Solar intelligence<br/>at your fingertips.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6, maxWidth: 340 }}>
              Monitor, predict, and optimize your solar infrastructure
              with real-time AI-driven insights.
            </p>
          </div>

          {/* Solar panel card */}
          <div style={{ marginBottom: 48 }}>
            <SolarPanelCard />
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={13} color="rgba(255,255,255,0.85)" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: 32,
            marginTop: 48,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 500, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        background: '#FAFBFF',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '-20%', right: '-10%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-10%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 10 }}>

          {/* Form header */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              marginBottom: 8,
            }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5 }}>
              Sign in to your Solara dashboard to continue optimizing your solar array.
            </p>
          </div>

          {/* Demo credentials hint */}
          <div style={{
            background: '#EEF2FF',
            border: '1px solid #C7D2FE',
            borderRadius: 10,
            padding: '11px 14px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#3B5BDB', marginBottom: 2 }}>
                Demo credentials
              </p>
              <p style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>
                admin@solara.io · solara2025
              </p>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                fontSize: 11, fontWeight: 700, color: '#3B5BDB',
                background: 'rgba(59,91,219,0.1)',
                border: '1px solid rgba(59,91,219,0.2)',
                borderRadius: 6, padding: '4px 10px',
                cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(59,91,219,0.18)'}
              onMouseLeave={e => e.target.style.background = 'rgba(59,91,219,0.1)'}
            >
              Fill in
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 10,
              padding: '10px 14px',
              marginBottom: 20,
              fontSize: 13,
              color: '#EF4444',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 15 }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block',
                fontSize: 13, fontWeight: 600, color: '#374151',
                marginBottom: 6,
              }}>
                Email address
              </label>
              <input
                type="email"
                className="login-input"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 8 }}>
              <label style={{
                display: 'block',
                fontSize: 13, fontWeight: 600, color: '#374151',
                marginBottom: 6,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: '#94A3B8',
                    display: 'flex', alignItems: 'center',
                    padding: 0,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#64748B'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 28, marginTop: 4,
            }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'pointer', fontSize: 13, color: '#64748B',
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{
                    width: 15, height: 15,
                    accentColor: '#3B5BDB',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontWeight: 500 }}>Remember me</span>
              </label>
              <button
                type="button"
                style={{
                  fontSize: 13, fontWeight: 600,
                  color: '#3B5BDB', background: 'none',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  padding: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.target.style.color = '#2F4AC7'}
                onMouseLeave={e => e.target.style.color = '#3B5BDB'}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in to Dashboard'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '24px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Social login buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Google',   icon: '🔵' },
              { label: 'Microsoft',icon: '🟦' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setError('Social login not configured in demo.')}
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '11px 16px',
                  background: '#fff',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 13, fontWeight: 600, color: '#374151',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C7D2FE'; e.currentTarget.style.background = '#FAFBFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Footer note */}
          <p style={{
            textAlign: 'center',
            fontSize: 12,
            color: '#94A3B8',
            marginTop: 32,
            lineHeight: 1.5,
          }}>
            Don't have an account?{' '}
            <button
              type="button"
              style={{
                color: '#3B5BDB', fontWeight: 600, fontSize: 12,
                background: 'none', border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'color 0.15s',
              }}
              onClick={() => setError('Registration opens in Q3 2025. Use demo credentials to explore.')}
            >
              Request access
            </button>
          </p>

          {/* Copyright */}
          <p style={{
            textAlign: 'center',
            fontSize: 11,
            color: '#CBD5E1',
            marginTop: 24,
          }}>
            © 2025 Solara Energy Systems · All rights reserved
          </p>
        </div>
      </div>

      {/* Spin keyframe for loader */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}