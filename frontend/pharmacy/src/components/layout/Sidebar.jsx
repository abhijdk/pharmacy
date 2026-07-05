import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { THEME } from '../../constants/theme';
import { cn } from '../../utils/cn';
// Notice how we only have ONE import line for lucide-react now, containing Package!
import { LayoutDashboard, User, Settings, LogOut, X, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; 

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Inventory', icon: Package, path: '/inventory' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth(); 

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        THEME.styles.glassCard,
        'fixed inset-y-0 left-0 z-50 w-64 transform flex-col justify-between border-y-0 border-l-0 rounded-none transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex',
        isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
      )}>
        <div>
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/[0.08]">
            <span className={THEME.styles.headingPremium}>CRED.SYS</span>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links using NavLink for Active States */}
          <nav className="flex flex-col gap-2 p-4 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => onClose()} 
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wide rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-white/[0.1] text-light border border-white/[0.1]" 
                    : "text-gray-400 hover:bg-white/[0.05] hover:text-light"
                )}
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Area */}
        <div className="p-4 border-t border-white/[0.08]">
          <button 
            onClick={logout} 
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wide text-gray-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full text-left"
          >
            <LogOut size={18} />
            Secure Logout
          </button>
        </div>
      </aside>
    </>
  );
}