import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Info } from 'lucide-react';

export const OperationSetup: React.FC = () => {
  const navigate = useNavigate();
  const [heatingSetpoint, setHeatingSetpoint] = useState(20.0);
  const [coolingSetpoint, setCoolingSetpoint] = useState(26.0);
  const [lightingLoad, setLightingLoad] = useState(5.0);
  const [equipmentLoad, setEquipmentLoad] = useState(5.0);

  const handleNext = () => navigate('/expert/advanced');
  const handlePrev = () => navigate('/expert/openings');

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <Clock className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">HVAC Thermostat Setpoints</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-[#4A3B66] font-bold flex justify-between">
              <span>Heating Setpoint (°C)</span>
              <span className="font-mono text-[#6546A5] font-extrabold bg-[#EDE7F6] px-2 py-0.5 rounded border border-[#6546A5]/20">{heatingSetpoint.toFixed(1)}°C</span>
            </label>
            <input
              type="range"
              min="15"
              max="24"
              step="0.5"
              value={heatingSetpoint}
              onChange={(e) => setHeatingSetpoint(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#E5DBF5] rounded-lg appearance-none cursor-pointer accent-[#6546A5]"
            />
            <p className="text-[10px] text-[#6B5B82]">Indoor temperature limit below which passive solar/backup heating engages.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#4A3B66] font-bold flex justify-between">
              <span>Cooling Setpoint (°C)</span>
              <span className="font-mono text-[#2563A9] font-extrabold bg-[#DCEEFF] px-2 py-0.5 rounded border border-[#2563A9]/20">{coolingSetpoint.toFixed(1)}°C</span>
            </label>
            <input
              type="range"
              min="22"
              max="30"
              step="0.5"
              value={coolingSetpoint}
              onChange={(e) => setCoolingSetpoint(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#E5DBF5] rounded-lg appearance-none cursor-pointer accent-[#2563A9]"
            />
            <p className="text-[10px] text-[#6B5B82]">Indoor temperature limit above which summer night purge ventilation operates.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Internal Heat Gains</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Lighting Load (W/m²)</label>
            <input
              type="number"
              step="0.1"
              value={lightingLoad}
              onChange={(e) => setLightingLoad(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Equipment / Plug Loads (W/m²)</label>
            <input
              type="number"
              step="0.1"
              value={equipmentLoad}
              onChange={(e) => setEquipmentLoad(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
        </div>

        <div className="border border-[#E2D5F2] bg-[#F8F5FD] rounded-xl p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-[#6546A5] shrink-0 mt-0.5" />
          <div className="text-[11px] text-[#4A3B66] leading-relaxed font-sans">
            Internal gains are critical for passive thermal shelter design. In extreme cold zones like Leh (-15°C), metabolic heat from occupants, lighting, and appliances acts as a constant base heat source.
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
          <span>Continue to Advanced</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
