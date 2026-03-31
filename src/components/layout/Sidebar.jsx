import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Upload, TrendingUp, Wrench,
  Settings, HelpCircle, LogOut, Zap
} from 'lucide-react';
import clsx from 'clsx';

const mainNav = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Overview'    },
  { to: '/upload',          icon: Upload,          label: 'Analysis'    },
  { to: '/prediction',      icon: TrendingUp,      label: 'Predictions' },
  { to: '/recommendations', icon: Wrench,          label: 'Maintenance' },
];

const bottomNav = [
  { icon: Settings,   label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-navbar left-0 bottom-0 w-sidebar bg-surface border-r border-border z-40 hidden lg:flex flex-col">

      {/* ── Main Nav ── */}
      <nav className="flex-1 p-3 space-y-0.5 pt-4">
        {mainNav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => clsx(
            's-nav-item',
            isActive && 's-nav-item-active'
          )}>
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-primary' : 'text-ink-400'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Optimize CTA ── */}
      <div className="px-3 mb-4">
        <button className="s-btn-primary w-full justify-center py-2.5 text-sm rounded-lg shadow-primary-sm">
          <Zap size={14} strokeWidth={2.5} />
          Optimize Now
        </button>
      </div>

      {/* ── Bottom nav ── */}
      <div className="p-3 border-t border-border space-y-0.5">
        <button className="s-nav-item w-full">
          <HelpCircle size={16} className="text-ink-400" />
          <span>Support</span>
        </button>
        <button className="s-nav-item w-full text-status-red hover:text-status-red hover:bg-status-redBg">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}