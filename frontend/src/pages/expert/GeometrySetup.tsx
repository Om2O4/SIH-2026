import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Ruler } from 'lucide-react';

export const GeometrySetup: React.FC = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(8);
  const [length, setLength] = useState(12);
  const [height, setHeight] = useState(3);
  const [orientation, setOrientation] = useState(180); // 180 degrees (South facing)
  const [floors, setFloors] = useState(1);

  // Area and Volume calculations
  const totalArea = width * length * floors;
  const totalVolume = width * length * height * floors;

  const handleNext = () => navigate('/expert/envelope');
  const handlePrev = () => navigate('/expert/project');

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <Ruler className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Structural Dimensions</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Width (m)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Length (m)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Height (m)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Orientation Angle (Degrees relative to North)</label>
            <input
              type="number"
              value={orientation}
              onChange={(e) => setOrientation(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
            <p className="text-[10px] text-[#6B5B82]">0° = North, 90° = East, 180° = South (Optimum for Ladakh), 270° = West</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Number of Floors</label>
            <input
              type="number"
              value={floors}
              onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Technical metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-5 text-center shadow-xs">
          <p className="text-[10px] uppercase font-bold text-[#6B5B82] tracking-wider font-mono">Total Floor Area</p>
          <p className="text-2xl font-extrabold text-[#241344] mt-1 font-display">{totalArea} m²</p>
        </div>
        <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-5 text-center shadow-xs">
          <p className="text-[10px] uppercase font-bold text-[#6B5B82] tracking-wider font-mono">Gross Volume</p>
          <p className="text-2xl font-extrabold text-[#241344] mt-1 font-display">{totalVolume} m³</p>
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
          <span>Continue to Envelope</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
