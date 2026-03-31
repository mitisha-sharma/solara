import { Link, useLocation, NavLink } from 'react-router-dom';
import { Bell, Settings, Search, Zap } from 'lucide-react';
import clsx from 'clsx';

const appNavLinks = [
  { to: '/dashboard',       label: 'Dashboard' },
  { to: '/upload',          label: 'Upload'    },
  { to: '/prediction',      label: 'Insights'  },
  { to: '/recommendations', label: 'Reports'   },
];

export default function Navbar() {
  const location  = useLocation();
  const isLogin   = location.pathname === '/';
  const isLanding = location.pathname === '/home';
  const isApp     = !isLogin && !isLanding;

  // Don't render on login page
  if (isLogin) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-navbar bg-surface border-b border-border">
      <div className="h-full flex items-center px-4 gap-4">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 shrink-0 min-w-[140px]">
          {isApp && (
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shadow-primary-sm">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
          )}
          <div>
            <p className={clsx('font-bold leading-none', isLanding ? 'text-base text-ink-900' : 'text-sm text-ink-900')}>
              Solara
            </p>
            {isApp && (
              <p className="text-2xs text-ink-400 font-medium tracking-wide uppercase leading-none mt-0.5">
                Optimization Engine
              </p>
            )}
          </div>
        </Link>

        {/* Landing nav */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {['Dashboard','Upload','Insights','Reports'].map(label => (
              <a key={label} href="#"
                className="px-3 py-1.5 text-sm font-medium text-ink-500 hover:text-ink-800 hover:bg-page rounded-md transition-colors">
                {label}
              </a>
            ))}
          </nav>
        )}

        {/* App nav */}
        {isApp && (
          <nav className="flex items-center gap-1 ml-4">
            {appNavLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => clsx(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'text-primary font-semibold border-b-2 border-primary rounded-none pb-[5px]'
                  : 'text-ink-500 hover:text-ink-800 hover:bg-page'
              )}>
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex s-search w-48 lg:w-56">
            <Search size={13} className="shrink-0" />
            <input
              type="text"
              placeholder={isLanding ? 'Search systems...' : 'Search data...'}
              className="bg-transparent border-none outline-none text-sm text-ink-900 placeholder:text-ink-400 w-full"
            />
          </div>

          <button className="s-btn-icon relative">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-status-red border border-surface" />
          </button>

          <button className="s-btn-icon">
            <Settings size={15} />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-surface hover:ring-primary-200 transition-all">
            S
          </div>
        </div>
      </div>
    </header>
  );
}