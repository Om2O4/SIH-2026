import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  Compass, 
  Cpu, 
  CloudSun, 
  LineChart, 
  Box, 
  Sliders, 
  FileText, 
  Settings, 
  Bell, 
  User as UserIcon, 
  ThermometerSnowflake, 
  Sun,
  Menu,
  X,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { HealthCheck } from '../HealthCheck';
import { CreateProjectModal } from '../common/CreateProjectModal';

export type UserRole = 'homeowner' | 'engineer' | 'researcher';

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('homeowner');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const roleLabels: Record<UserRole, { title: string; badge: string; color: string }> = {
    homeowner: { title: 'Homeowner / Planner', badge: 'Simple Focus', color: 'bg-[#2E7D4F] text-white' },
    engineer: { title: 'Engineer / Designer', badge: 'CAD & Physics', color: 'bg-[#6546A5] text-white' },
    researcher: { title: 'Researcher / Academic', badge: 'Pareto & Climate', color: 'bg-[#2563A9] text-white' },
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, exact: true },
    { name: 'New Project', path: '/simple', icon: PlusCircle },
    { name: 'My Projects', path: '/projects', icon: FolderKanban },
    { name: 'Simple Mode', path: '/simple', icon: Compass, badge: 'Fast' },
    { name: 'Expert Mode', path: '/expert/project', icon: Cpu, badge: 'Pro' },
    { name: 'Climate Data', path: '/climate-data', icon: CloudSun },
    { name: 'Analysis & Results', path: '/results', icon: LineChart },
    { name: '3D Digital Twin', path: '/3d-twin', icon: Box },
    { name: 'What-If Analysis', path: '/what-if', icon: Sliders },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isCurrentActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-[#64748B]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Weather Widget */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#DCEEFF]/60 border border-[#2563A9]/20 rounded-full px-3.5 py-1.5 text-xs">
            <Sun className="w-4 h-4 text-[#F28C28] animate-spin-slow" />
            <div className="flex items-center space-x-1.5 font-medium">
              <span className="font-bold text-[#0B2559]">-8°C</span>
              <span className="text-[#64748B]">Leh, Ladakh</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Upper Right Corner CREATE NEW Tab / Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-1.5 bg-[#2E7D4F] hover:bg-[#256640] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create New</span>
          </button>

          {/* Health Check indicator */}
          <div className="hidden md:block">
            <HealthCheck />
          </div>

          {/* Notification Icon */}
          <button 
            className="relative p-2 rounded-full hover:bg-slate-100 text-[#64748B] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F28C28] rounded-full"></span>
          </button>

          {/* Role / User Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center space-x-2 p-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white transition-all text-left"
            >
              <div className="w-7 h-7 rounded-full bg-[#0B2559] text-white flex items-center justify-center text-xs font-bold">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="hidden xl:block text-left pr-1">
                <p className="text-[11px] font-bold text-[#0B2559] leading-tight">
                  {roleLabels[selectedRole].title.split(' ')[0]}
                </p>
                <p className="text-[9px] text-[#64748B]">Active Persona</p>
              </div>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] px-3 py-1.5 font-mono">
                  Switch Persona
                </p>
                {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedRole === role ? 'bg-[#DCEEFF] text-[#0B2559] font-bold' : 'hover:bg-slate-50 text-[#172033]'
                    }`}
                  >
                    <span>{roleLabels[role].title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${roleLabels[role].color}`}>
                      {roleLabels[role].badge}
                    </span>
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition-colors cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out / Switch Mode</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-[#E2E8F0] bg-white px-4 py-5 justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] font-mono px-3 mb-2">
                Navigation
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = isCurrentActive(item.path, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[#0B2559] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#0B2559] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#64748B]'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          active 
                            ? 'bg-white/20 text-white' 
                            : item.badge === 'Fast' 
                              ? 'bg-[#DDF3E4] text-[#2E7D4F]' 
                              : 'bg-[#6546A5]/15 text-[#6546A5]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Climate Highlight Card */}
            <div className="bg-gradient-to-br from-[#DCEEFF]/50 to-white border border-[#2563A9]/20 rounded-xl p-3.5">
              <div className="flex items-center space-x-2 text-[#0B2559] font-bold text-xs mb-1.5">
                <ThermometerSnowflake className="w-4 h-4 text-[#2563A9]" />
                <span>Cold Arid Zone</span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Design calibrated for Leh, Ladakh (3,500m ASL). High solar irradiance with extreme winter sub-zero temperatures.
              </p>
            </div>
          </div>

          {/* User Profile info bottom */}
          <div className="border-t border-[#E2E8F0] pt-4 flex items-center space-x-3 px-1">
            <div className="w-8 h-8 rounded-full bg-[#2563A9] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              TK
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#0B2559] truncate">Tanuja Khatal</p>
              <p className="text-[10px] text-[#64748B] capitalize">{selectedRole}</p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl p-5 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <Logo size="sm" />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const active = isCurrentActive(item.path, item.exact);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                          active ? 'bg-[#0B2559] text-white' : 'text-[#64748B] hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content View Outlet */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] flex flex-col justify-between">
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Global Footer Banner */}
          <footer className="border-t border-[#E2E8F0] bg-white py-4 px-6 md:px-8 text-center text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#0B2559]">CLIMASHELTER AI</span>
              <span>• Area-Specific Passive Design & Thermal Engine</span>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">Cold-Climate Calibrated</span>
              <span>Ladakh Edition v1.0.0</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
