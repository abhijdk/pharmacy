import React from 'react';
import { THEME } from '../../constants/theme';
import { Menu, Bell, User as UserIcon } from 'lucide-react';

export function Header({ onMenuClick }) {
  return (
    <header className={`${THEME.styles.glassCard} h-16 border-x-0 border-t-0 rounded-none flex items-center justify-between px-4 lg:px-8 z-30 relative`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
        >
          <Menu size={20} />
        </button>
        
        {/* Placeholder for page title, will be dynamic later */}
        <h2 className="text-sm font-medium tracking-widest uppercase text-light hidden sm:block">
          Overview
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors relative">
          <Bell size={18} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-white/[0.1] border border-white/[0.2] flex items-center justify-center cursor-pointer hover:border-white transition-colors">
          <UserIcon size={16} className="text-light" />
        </div>
      </div>
    </header>
  );
}