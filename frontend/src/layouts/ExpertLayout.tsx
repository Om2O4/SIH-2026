import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  FolderGit2, 
  Box, 
  Layers, 
  Grid, 
  Clock, 
  SlidersHorizontal, 
  Cpu, 
  Eye, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sun,
  Play
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { HealthCheck } from '../components/HealthCheck';

interface SidebarItem {
  name: string;
  stepNum: number;
  path: string;
  icon: React.ComponentType<any>;
  description: string;
}

export const ExpertLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: SidebarItem[] = [
    { name: 'Project Info', stepNum: 1, path: '/expert/project', icon: FolderGit2, description: 'Location & climate setup' },
    { name: 'Geometry', stepNum: 2, path: '/expert/geometry', icon: Box, description: 'Shelter dimension controls' },
    { name: 'Envelope Assemblies', stepNum: 3, path: '/expert/envelope', icon: Layers, description: 'Wall, roof, slab materials' },
    { name: 'Openings & Windows', stepNum: 4, path: '/expert/openings', icon: Grid, description: 'Window dimensions & glazing' },
    { name: 'Operation Schedule', stepNum: 5, path: '/expert/operation', icon: Clock, description: 'Occupancy & HVAC setpoints' },
    { name: 'Advanced Options', stepNum: 6, path: '/expert/advanced', icon: SlidersHorizontal, description: 'Infiltration & thermal mass' },
    { name: 'Optimization Presets', stepNum: 7, path: '/expert/optimization', icon: Cpu, description: 'Genetic variables & targets' },
    { name: 'Review & Simulate', stepNum: 8, path: '/expert/review', icon: Eye, description: 'Simulate heat-loss balance' },
  ];

  const currentStep = menuItems.find(item => item.path === location.pathname) || menuItems[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD] text-[#241344] font-sans">
      
      {/* Fullscreen Lavender Top Header */}
      <header className="border-b border-[#E5DBF5] bg-white/95 backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        
        {/* Left: Back to Dashboard & Brand Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#F3EEFA] hover:bg-[#EDE4F8] border border-[#DAC9F2] text-xs font-bold text-[#4A2D82] transition-all cursor-pointer shadow-xs"
            title="Exit to Main Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Dashboard</span>
          </button>

          <div className="h-5 w-px bg-[#E5DBF5] hidden sm:block"></div>

          <div className="flex items-center space-x-2.5">
            <Logo size="sm" showSubtitle={false} />
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE7F6] text-[#6546A5] font-mono uppercase tracking-wider border border-[#6546A5]/25">
              EXPERT CAD STUDIO
            </span>
          </div>
        </div>

        {/* Right: Station Weather & Quick Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Climate Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-[#F3EEFA] border border-[#DAC9F2] rounded-full px-3.5 py-1.5 text-xs text-[#4A2D82]">
            <Sun className="w-3.5 h-3.5 text-[#F28C28]" />
            <span className="font-bold text-[#241344]">-8°C</span>
            <span>Leh Station (3,500m ASL)</span>
          </div>

          <HealthCheck />

          {/* Direct Run Shortcut */}
          <button
            onClick={() => navigate('/expert/review')}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#6546A5] hover:bg-[#523587] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" />
            <span className="hidden sm:inline">Simulate</span>
          </button>
        </div>
      </header>

      {/* Main Fullscreen Lavender Workspace (Single Left Sidebar + Center CAD Studio) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Step Sidebar in Lavender Palette */}
        <aside className="w-full md:w-80 border-r border-[#E5DBF5] bg-white p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between px-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B5B82] font-mono">
                  8-Step Design Pipeline
                </span>
                <span className="text-[10px] font-mono text-[#6546A5] font-bold bg-[#EDE7F6] px-2 py-0.5 rounded-full border border-[#6546A5]/20">
                  Step {currentStep.stepNum}/8
                </span>
              </div>

              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isPast = currentStep.stepNum > item.stepNum;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#6546A5] border-[#6546A5] text-white shadow-md'
                          : isPast
                            ? 'border-[#E5DBF5] bg-[#F5F0FA] text-[#4A2D82] hover:bg-[#EDE4F8]'
                            : 'border-transparent bg-transparent text-[#6B5B82] hover:bg-[#F8F5FC] hover:text-[#241344]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : isPast 
                              ? 'bg-[#EDE7F6] text-[#6546A5]' 
                              : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-[#241344]'}`}>
                            {item.stepNum}. {item.name}
                          </p>
                          <p className={`text-[10px] font-medium truncate w-40 ${isActive ? 'text-white/80' : 'text-[#6B5B82]'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Project Sandbox Card in Light Lavender */}
            <div className="border border-[#E2D5F2] rounded-2xl p-4 bg-gradient-to-br from-[#F9F6FD] to-[#F1EAF8] space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6546A5] font-mono">
                  Live Project Model
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] text-[#4A2D82]">
                <div className="flex justify-between">
                  <span className="text-[#6B5B82]">Climate:</span>
                  <span className="text-[#241344] font-semibold">Leh, Ladakh (Cold Arid)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5B82]">Orientation:</span>
                  <span className="text-[#F28C28] font-bold">180° True South</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5B82]">Envelope:</span>
                  <span className="text-[#241344]">Rammed Earth + EPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5B82]">Glazing:</span>
                  <span className="text-[#2563A9] font-semibold">Double Low-E Argon</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5DBF5] flex items-center space-x-2 text-[10px] text-[#6B5B82] font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>RC differential physics active</span>
          </div>
        </aside>

        {/* Dynamic CAD Workspace Container in Soft Lavender Background */}
        <section className="flex-1 p-6 lg:p-10 overflow-y-auto bg-[#FAF8FD] flex flex-col justify-between">
          <div className="max-w-4xl mx-auto w-full">
            {/* Step Header */}
            {currentStep && (
              <div className="mb-6 pb-4 border-b border-[#E5DBF5] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#6546A5] bg-[#EDE7F6] border border-[#6546A5]/20 px-2.5 py-0.5 rounded-full">
                      Step {currentStep.stepNum} of 8
                    </span>
                    <h2 className="text-xl font-bold text-[#241344] font-display">{currentStep.name}</h2>
                  </div>
                  <p className="text-xs text-[#6B5B82] mt-1">{currentStep.description}</p>
                </div>
              </div>
            )}
            
            {/* Outlet for step form */}
            <div className="bg-white border border-[#E5DBF5] rounded-3xl p-6 lg:p-8 shadow-xs">
              <Outlet />
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full pt-8 text-center text-[11px] text-[#8C7A9E] font-mono">
            CLIMASHELTER AI • High-Altitude Expert Mode CAD Studio
          </div>
        </section>

      </div>
    </div>
  );
};
