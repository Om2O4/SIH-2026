import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, AlertCircle, HelpCircle } from 'lucide-react';
import { HealthCheck } from '../components/HealthCheck';

export const SimpleDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-navy-100">
      {/* Header */}
      <header className="border-b border-navy-900 bg-navy-950/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-navy-900 border border-navy-800 hover:bg-navy-800 text-navy-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center">
              <Compass className="w-5 h-5 mr-2 text-primary-500" />
              Simple Mode
            </h1>
            <p className="text-xs text-navy-400">Quick shelter design and optimization recommendations</p>
          </div>
        </div>
        <HealthCheck />
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        <div className="bg-navy-950/40 border border-navy-900 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-950/60 border border-primary-500/30 text-primary-500">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Under Construction</h2>
              <p className="text-sm text-navy-400">Simple mode visual aids and preset defaults setup.</p>
            </div>
          </div>
          
          <p className="text-navy-300 text-sm leading-relaxed mb-6">
            Simple mode automatically chooses optimal technical variables (such as envelope insulation properties, ventilation rates, solar angles, and shading coefficients) based on the user's location selection. This ensures normal planners can generate green-compliant shelters with minimal parameters.
          </p>

          <div className="border border-amber-900/30 bg-amber-950/15 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/80 leading-relaxed">
              <span className="font-semibold text-amber-400 block mb-0.5">Development Priority Notice</span>
              Expert Mode is the primary development focus for this engineering prototype. It contains detailed configurations which are required to run the unified simulations and calculations.
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate('/expert')}
            className="px-5 py-2.5 rounded-lg bg-primary-600 border border-primary-500 hover:bg-primary-500 transition-colors text-sm font-semibold text-white cursor-pointer"
          >
            Switch to Expert Mode
          </button>
        </div>
      </main>
    </div>
  );
};
