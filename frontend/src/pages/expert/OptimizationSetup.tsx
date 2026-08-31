import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Cpu, Target } from 'lucide-react';

export const OptimizationSetup: React.FC = () => {
  const navigate = useNavigate();
  const [targetMetric, setTargetMetric] = useState('energy_cost');
  const [maxBudget, setMaxBudget] = useState(8000);
  const [optimizeEnvelope, setOptimizeEnvelope] = useState(true);
  const [optimizeOpenings, setOptimizeOpenings] = useState(true);

  const handleNext = () => navigate('/expert/review');
  const handlePrev = () => navigate('/expert/advanced');

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <Target className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Optimization Target Metrics</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { id: 'energy_cost', label: 'Minimize Heating Need', desc: 'Finds envelope thickness and glazing ratios that eliminate winter auxiliary heating.' },
            { id: 'carbon_footprint', label: 'Minimize Embodied Carbon', desc: 'Prioritizes local Ladakhi materials (Rammed earth, willow joists) with zero emissions.' },
            { id: 'thermal_comfort', label: 'Maximize Thermal Comfort', desc: 'Optimizes indoor temperature stability within 20°C–22°C comfort band.' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTargetMetric(item.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                targetMetric === item.id 
                  ? 'bg-white border-[#6546A5] shadow-xs'
                  : 'bg-white border-[#E5DBF5] hover:border-[#DAC9F2]'
              }`}
            >
              <span className={`text-xs font-bold block mb-1.5 ${targetMetric === item.id ? 'text-[#6546A5]' : 'text-[#241344]'}`}>
                {item.label}
              </span>
              <span className="text-[10px] text-[#6B5B82] leading-normal block">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <Cpu className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Genetic Variable Search Space</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Maximum Material Cost Budget (₹ in Thousands)</label>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5DBF5] bg-white">
              <div>
                <p className="text-xs font-bold text-[#241344]">Vary Insulation Thickness</p>
                <p className="text-[10px] text-[#6B5B82]">Search bounds: 0.02m to 0.25m EPS / Mineral Wool</p>
              </div>
              <input
                type="checkbox"
                checked={optimizeEnvelope}
                onChange={(e) => setOptimizeEnvelope(e.target.checked)}
                className="w-4 h-4 text-[#6546A5] border-[#DCD0F0] rounded focus:ring-[#6546A5] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5DBF5] bg-white">
              <div>
                <p className="text-xs font-bold text-[#241344]">Vary South Glazing Areas</p>
                <p className="text-[10px] text-[#6B5B82]">Search bounds: 10% to 40% window-to-wall ratios</p>
              </div>
              <input
                type="checkbox"
                checked={optimizeOpenings}
                onChange={(e) => setOptimizeOpenings(e.target.checked)}
                className="w-4 h-4 text-[#6546A5] border-[#DCD0F0] rounded focus:ring-[#6546A5] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-[#E5DBF5]">
        <button
          onClick={handlePrev}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-[#DAC9F2] hover:bg-[#F3EEFA] text-xs font-bold text-[#4A2D82] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#6546A5] hover:bg-[#523587] text-xs font-bold text-white transition-all shadow-xs cursor-pointer"
        >
          <span>Continue to Review</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
