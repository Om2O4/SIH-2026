import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  Sun, 
  Compass, 
  Cpu, 
  Sparkles, 
  Lock, 
  Mail, 
  CheckCircle2
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('tanuja.khatal@climashelter.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedPersona, setSelectedPersona] = useState<'homeowner' | 'engineer' | 'researcher'>('homeowner');
  const [isLoading, setIsLoading] = useState(false);

  const personas = [
    {
      id: 'homeowner',
      title: 'Home Owner / Planner',
      mode: 'Simple Mode Focus',
      desc: 'Quick 4-step wizard with automatic cold-climate physics synthesis and instant comfort scoring.',
      badgeColor: 'bg-[#2E7D4F] text-white',
      borderHover: 'hover:border-[#2E7D4F]',
      icon: Compass
    },
    {
      id: 'engineer',
      title: 'Engineer / Designer',
      mode: 'Expert CAD & RC Solver',
      desc: 'Multi-layer envelope configuration, dynamic 24h thermal balance, and 3D digital twin explorer.',
      badgeColor: 'bg-[#6546A5] text-white',
      borderHover: 'hover:border-[#6546A5]',
      icon: Cpu
    },
    {
      id: 'researcher',
      title: 'Researcher / Planner',
      mode: 'Pareto Optimization & Atlas',
      desc: 'NSGA-II multi-objective genetic solver, station climate data atlas, and academic export reports.',
      badgeColor: 'bg-[#2563A9] text-white',
      borderHover: 'hover:border-[#2563A9]',
      icon: Shield
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 400);
  };

  const handleQuickEnter = (personaId: 'homeowner' | 'engineer' | 'researcher') => {
    setSelectedPersona(personaId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0B2559] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563A9] rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2E7D4F] rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Top Header */}
      <header className="relative z-10 px-6 lg:px-12 py-5 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md">
        <Logo size="md" />
        <div className="flex items-center space-x-3 text-xs text-slate-300">
          <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
            <Sun className="w-3.5 h-3.5 text-[#F28C28]" />
            <span className="font-bold text-white">-8°C</span>
            <span>Leh Station</span>
          </div>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 my-4">
        <div className="max-w-4xl w-full grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand & High-Altitude Context */}
          <div className="lg:col-span-5 text-white space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#DCEEFF]/10 border border-white/20 text-xs font-mono text-[#DCEEFF]">
              <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Ladakh & High-Altitude Ready</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold font-display leading-tight tracking-tight">
              Design Smarter. <br />
              Build Better. <br />
              <span className="text-[#38BDF8]">Stay Comfortable.</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Area-specific passive shelter design, dynamic thermal analysis, and genetic optimization for extreme cold climates (-20°C).
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unified RC Thermal Network Physics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive 3D Digital Twin & Sun Path Simulation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Working & Completed Project Lifecycle Management</span>
              </div>
            </div>
          </div>

          {/* Right Column: Persona Switcher & Login Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 lg:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B2559] font-display">
                Sign In to CLIMASHELTER AI
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Select your engineering workflow persona to access your project dashboard
              </p>
            </div>

            {/* Persona Choices */}
            <div className="space-y-2.5">
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] font-mono">
                Select Active Persona:
              </p>
              <div className="grid gap-2.5">
                {personas.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPersona === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id as any)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3.5 ${
                        isSelected 
                          ? 'border-[#0B2559] bg-[#F8FAFC] shadow-xs' 
                          : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${
                        isSelected ? 'bg-[#0B2559] text-white' : 'bg-slate-100 text-[#64748B]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-[#0B2559]">{p.title}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${p.badgeColor}`}>
                            {p.mode}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{p.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172033]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563A9] bg-[#F8FAFC]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-[#172033]">Password</label>
                  <a href="#forgot" className="text-[#2563A9] hover:underline text-[11px]">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#2563A9] bg-[#F8FAFC]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#0B2559] hover:bg-[#2563A9] text-white font-bold text-xs transition-colors shadow-md cursor-pointer disabled:opacity-75"
              >
                <span>{isLoading ? 'Accessing Workspace...' : 'Enter Fullpage Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-1 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => handleQuickEnter(selectedPersona)}
                className="text-xs text-[#2563A9] font-bold hover:underline cursor-pointer"
              >
                Instant Guest Preview →
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-slate-400 border-t border-white/10">
        CLIMASHELTER AI • Area-Specific Passive Building & Optimization System © 2026
      </footer>
    </div>
  );
};
