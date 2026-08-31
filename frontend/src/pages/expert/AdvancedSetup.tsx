import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

export const AdvancedSetup: React.FC = () => {
  const navigate = useNavigate();
  const [infiltrationRate, setInfiltrationRate] = useState(0.5); // 0.5 ACH
  const [naturalVentilation, setNaturalVentilation] = useState(true);
  const [thermalMass, setThermalMass] = useState(true);

  const handleNext = () => navigate('/expert/optimization');
  const handlePrev = () => navigate('/expert/operation');

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <SlidersHorizontal className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Thermal Dynamics & Ventilation</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ACH Slider */}
          <div className="space-y-2">
            <label className="text-xs text-[#4A3B66] font-bold flex justify-between">
              <span>Infiltration Rate (ACH)</span>
              <span className="font-mono text-[#6546A5] font-extrabold bg-[#EDE7F6] px-2 py-0.5 rounded border border-[#6546A5]/20">{infiltrationRate.toFixed(2)} ACH</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={infiltrationRate}
              onChange={(e) => setInfiltrationRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#E5DBF5] rounded-lg appearance-none cursor-pointer accent-[#6546A5]"
            />
            <p className="text-[10px] text-[#6B5B82]">
              Air changes per hour due to cracks. Low values (0.2–0.5 ACH) prevent sub-zero night heat leaks.
            </p>
          </div>

          <div className="space-y-3">
            {/* Natural Ventilation Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5DBF5] bg-white">
              <div>
                <p className="text-xs font-bold text-[#241344]">Natural Ventilation</p>
                <p className="text-[10px] text-[#6B5B82]">Enable daytime purge windows & stack effect</p>
              </div>
              <input
                type="checkbox"
                checked={naturalVentilation}
                onChange={(e) => setNaturalVentilation(e.target.checked)}
                className="w-4 h-4 text-[#6546A5] border-[#DCD0F0] rounded focus:ring-[#6546A5] cursor-pointer"
              />
            </div>

            {/* Thermal Mass Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5DBF5] bg-white">
              <div>
                <p className="text-xs font-bold text-[#241344]">Enable Heavy Thermal Mass</p>
                <p className="text-[10px] text-[#6B5B82]">Activate Rammed Earth / Trombe wall storage equations</p>
              </div>
              <input
                type="checkbox"
                checked={thermalMass}
                onChange={(e) => setThermalMass(e.target.checked)}
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
          <span>Continue to Optimization</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
