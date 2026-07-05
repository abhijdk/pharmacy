import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { THEME } from '../../constants/theme';
import { Card, Button } from '../../components/ui';
import { Activity, ShieldCheck, CreditCard, ArrowUpRight, Clock, ChevronRight } from 'lucide-react';

// Mock Data for Recent Activity
const recentLogs = [
  { id: 1, action: 'System Login', status: 'Success', time: '2 mins ago', ip: '192.168.1.42' },
  { id: 2, action: 'Firewall Update', status: 'Completed', time: '1 hour ago', ip: 'System' },
  { id: 3, action: 'Failed Auth Attempt', status: 'Blocked', time: '3 hours ago', ip: '45.22.19.11' },
  { id: 4, action: 'Data Backup', status: 'Verified', time: '5 hours ago', ip: 'System' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* 1. Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className={`${THEME.styles.headingPremium} text-2xl lg:text-3xl mb-1`}>
            Command Center
          </h1>
          <p className={THEME.styles.bodyMuted}>
            Welcome back, <span className="text-light">{user?.username || 'Administrator'}</span>. System operating at optimal capacity.
          </p>
        </div>
        <Button variant="secondary" className="whitespace-nowrap">
          Generate Report <ArrowUpRight size={16} className="ml-2" />
        </Button>
      </div>

      {/* 2. Top Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/[0.05] rounded-lg">
              <Activity size={20} className="text-light" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded">Live</span>
          </div>
          <p className="text-gray-400 text-xs tracking-wider uppercase mb-1">Network Traffic</p>
          <h3 className="text-3xl text-light font-light tracking-tight">2.4<span className="text-lg text-gray-500">TB/s</span></h3>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/[0.05] rounded-lg">
              <ShieldCheck size={20} className="text-light" />
            </div>
          </div>
          <p className="text-gray-400 text-xs tracking-wider uppercase mb-1">Security Rating</p>
          <h3 className="text-3xl text-light font-light tracking-tight">99.8<span className="text-lg text-gray-500">%</span></h3>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/[0.05] rounded-lg">
              <CreditCard size={20} className="text-light" />
            </div>
          </div>
          <p className="text-gray-400 text-xs tracking-wider uppercase mb-1">Active Endpoints</p>
          <h3 className="text-3xl text-light font-light tracking-tight">1,204</h3>
        </Card>
      </div>

      {/* 3. Main Content Grid (Chart + Sidebars) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        
        {/* Left Column: Abstract Chart Placeholder (Spans 2 columns on desktop) */}
        <Card className="p-6 lg:col-span-2 min-h-[400px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-sm tracking-widest uppercase text-light font-medium">Bandwidth Analysis</h3>
            <select className="bg-transparent border border-white/[0.1] text-xs text-gray-400 p-1.5 rounded outline-none focus:border-white transition-colors cursor-pointer">
              <option className="bg-darker">Last 7 Days</option>
              <option className="bg-darker">Last 30 Days</option>
            </select>
          </div>
          
          {/* Mock Chart Visual - Pure CSS */}
          <div className="flex-1 flex items-end gap-2 relative z-10 mt-auto">
            {[40, 70, 45, 90, 65, 85, 100, 50, 75, 60, 30, 80].map((height, i) => (
              <div key={i} className="flex-1 bg-white/[0.05] rounded-t-sm relative group hover:bg-white/[0.15] transition-colors" style={{ height: `${height}%` }}>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-darker border border-white/[0.1] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {height}TB
                </div>
              </div>
            ))}
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-3/4 h-1/2 bg-white/[0.02] blur-3xl pointer-events-none" />
        </Card>

        {/* Right Column: Split into Quick Actions & Recent Activity */}
        <div className="flex flex-col gap-4 lg:gap-6">
          
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-sm tracking-widest uppercase text-light font-medium mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-between">
                <span>Deploy Patch</span>
                <ArrowUpRight size={16} className="text-gray-500" />
              </Button>
              <Button variant="secondary" className="w-full justify-between">
                <span>Audit Logs</span>
                <ArrowUpRight size={16} className="text-gray-500" />
              </Button>
            </div>
          </Card>

          {/* Recent Activity List */}
          <Card className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm tracking-widest uppercase text-light font-medium">System Log</h3>
              <button className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-light transition-colors flex items-center gap-1">
                View All <ChevronRight size={12} />
              </button>
            </div>
            
            <div className="space-y-5 flex-1">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex gap-3 group cursor-pointer">
                  <div className="mt-0.5">
                    <Clock size={16} className="text-gray-600 group-hover:text-light transition-colors" />
                  </div>
                  <div className="flex-1 border-b border-white/[0.03] pb-3 group-hover:border-white/[0.1] transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm text-light font-medium">{log.action}</p>
                      <span className={cn(
                        "text-[10px] tracking-wider uppercase",
                        log.status === 'Blocked' ? 'text-red-400' : 'text-gray-500'
                      )}>
                        {log.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{log.ip}</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Small inline utility for merging classes locally in this file if we didn't export it globally
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}