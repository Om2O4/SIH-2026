import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Cpu, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { HealthCheck } from '../../components/HealthCheck';

export const ModeSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen tech-grid flex flex-col bg-[#0b0f19] text-navy-100">
      {/* Header */}
      <header className="border-b border-navy-900 bg-navy-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 border border-primary-500 shadow-md">
            <Shield className="w-5 h-5 text-white font-bold" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white font-display">CLIMASHELTER <span className="text-primary-500 font-medium">AI</span></h1>
            <p className="text-[10px] text-navy-400 uppercase tracking-widest font-mono">Passive Design Engine</p>
          </div>
        </div>
        <HealthCheck />
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 font-display">
            Choose Your Design Mode
          </h2>
          <p className="text-navy-400 max-w-xl mx-auto text-sm md:text-base">
            Configure passive structures using advanced heat transfer simulations. Select an entry point suited to your workflow.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Simple Mode Card */}
          <div className="group relative flex flex-col justify-between p-8 rounded-xl border border-navy-900 bg-navy-950/40 hover:bg-navy-950/60 transition-all duration-300 shadow-sm hover:border-navy-800">
            <div>
              <div className="w-12 h-12 rounded-lg bg-navy-900/80 border border-navy-800 flex items-center justify-center mb-6 group-hover:border-navy-700 transition-colors">
                <Compass className="w-6 h-6 text-navy-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">Simple Mode</h3>
              <p className="text-navy-400 text-sm mb-6 leading-relaxed">
                For planners, local agencies, and homeowners seeking quick, actionable passive design recommendations.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Simplified climate & size inputs',
                  'Interactive visual design helper',
                  'Automated engineering default presets',
                  'Instant basic performance reports'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-navy-300">
                    <CheckCircle className="w-4 h-4 text-navy-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/simple')}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-navy-900 border border-navy-800 text-sm font-semibold text-white hover:bg-navy-800 transition-colors cursor-pointer"
            >
              Enter Simple Mode
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Expert Mode Card - Emphasized */}
          <div className="group relative flex flex-col justify-between p-8 rounded-xl border border-primary-700/50 bg-[#0e1628] hover:bg-[#111a30] transition-all duration-300 shadow-xl shadow-primary-950/20">
            {/* Spotlight Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-600/15 transition-all"></div>
            
            {/* Primary badge */}
            <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-primary-600 border border-primary-500 text-[10px] uppercase font-bold tracking-wider text-white">
              Primary Workflow
            </div>

            <div>
              <div className="w-12 h-12 rounded-lg bg-primary-950/60 border border-primary-500/30 flex items-center justify-center mb-6 group-hover:border-primary-500/50 transition-colors">
                <Cpu className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">Expert Mode</h3>
              <p className="text-navy-300 text-sm mb-6 leading-relaxed">
                For engineers, architects, and academic researchers seeking complete control over heat-balance variables and materials.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Precise multidirectional geometries',
                  'Layered envelope assemblies & thermal masses',
                  'Detailed openings, shading & solar coefs',
                  'Operational schedules & internal heat loads',
                  'Multi-objective genetic design optimization',
                  'Comprehensive heat-balance diagnostic outputs'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-navy-200">
                    <CheckCircle className="w-4 h-4 text-primary-500 mr-2.5 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/expert')}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary-600 border border-primary-500 text-sm font-semibold text-white hover:bg-primary-500 shadow-md transition-colors cursor-pointer"
            >
              Enter Expert Mode
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-900 bg-navy-950/40 py-6 px-8 text-center text-xs text-navy-500 font-mono">
        CLIMASHELTER AI Prototype v1.0.0 © 2026 • Designed for High-Performance Passive Building Systems
      </footer>
    </div>
  );
};
