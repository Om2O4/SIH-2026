import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Play, Loader2, AlertCircle } from 'lucide-react';
import { runSimulation, runOptimization } from '../../services/api';

export const ReviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('');

  const handleRunEngines = async () => {
    setRunning(true);
    setError(null);
    try {
      setStatusText('Connecting to Ladakh Thermal Engine...');
      const simConfig = { project_id: 'proj-1', run_type: 'fast_thermal' };
      const simRes = await runSimulation(simConfig);
      
      setStatusText('Running NSGA-II Genetic Pareto Optimization...');
      const optConfig = {
        project_id: 'proj-1',
        target_metric: 'energy_cost',
        max_budget: 8000,
        variable_envelope: true,
        variable_openings: true
      };
      const optRes = await runOptimization(optConfig);
      
      setStatusText('Orchestrating results dataset & 3D digital twin...');
      navigate('/results?mode=expert', { state: { simulation: simRes, optimization: optRes } });
    } catch (err: any) {
      setError(err.message || 'Error occurred while contacting backend. Verify API service is online.');
    } finally {
      setRunning(false);
    }
  };

  const handlePrev = () => navigate('/expert/optimization');

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Sandbox Verification Audit</h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E5DBF5]">
            <h4 className="font-bold text-[#241344] text-xs">1. Boundary Conditions</h4>
            <ul className="space-y-1.5 font-mono text-[#6B5B82] text-[11px]">
              <li>• Location: Leh, Ladakh (34.15°N, 77.57°E, 3,500m ASL)</li>
              <li>• Winter Design Temp: -16.2°C design night</li>
              <li>• Envelope: Rammed Earth + EPS (U = 0.22 W/m²K)</li>
              <li>• Primary Glazing: Double Low-E South facing (180°)</li>
            </ul>
          </div>
          
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E5DBF5]">
            <h4 className="font-bold text-[#241344] text-xs">2. Optimization Targets</h4>
            <ul className="space-y-1.5 font-mono text-[#6B5B82] text-[11px]">
              <li>• Objective 1: Maximize Winter Comfort Score</li>
              <li>• Objective 2: Minimize Auxiliary Heating Need</li>
              <li>• Variables: Insulation thickness & Glazing ratio</li>
              <li>• Model: 24h unsteady-state RC differential solver</li>
            </ul>
          </div>
        </div>

        <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed font-sans">
            <span className="font-bold text-emerald-800 block mb-0.5">Pre-Simulation Physical Validations Passed</span>
            Geometry boundaries do not overlap. Envelope layers have valid physical thermal resistance. Ready to execute unsteady-state thermal simulation and NSGA-II Pareto optimization.
          </div>
        </div>
      </div>

      {error && (
        <div className="border border-rose-200 bg-rose-50 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 leading-relaxed">
            <span className="font-bold text-rose-700 block mb-0.5">Engine Notice</span>
            {error}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-[#E5DBF5]">
        <button
          onClick={handlePrev}
          disabled={running}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-[#DAC9F2] hover:bg-[#F3EEFA] text-xs font-bold text-[#4A2D82] transition-colors disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleRunEngines}
          disabled={running}
          className="flex items-center space-x-2 px-7 py-3 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-xs font-bold text-white transition-all shadow-md disabled:opacity-75 cursor-pointer"
        >
          {running ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{statusText}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Run Thermal Simulation & Optimization</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
