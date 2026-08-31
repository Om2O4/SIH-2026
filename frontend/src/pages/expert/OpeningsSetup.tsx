import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Grid, Plus, Trash2 } from 'lucide-react';

interface Opening {
  type: 'Window' | 'Door';
  direction: 'North' | 'South' | 'East' | 'West';
  width: number; // m
  height: number; // m
  uValue: number; // W/m2K
  shgc: number; // Solar Heat Gain Coefficient
  shadingFactor: number;
}

export const OpeningsSetup: React.FC = () => {
  const navigate = useNavigate();

  const [openings] = useState<Opening[]>([
    { type: 'Window', direction: 'South', width: 2.5, height: 1.5, uValue: 2.8, shgc: 0.70, shadingFactor: 0.90 },
    { type: 'Window', direction: 'South', width: 2.0, height: 1.5, uValue: 2.8, shgc: 0.70, shadingFactor: 0.90 },
    { type: 'Window', direction: 'North', width: 1.0, height: 0.8, uValue: 2.8, shgc: 0.55, shadingFactor: 1.00 },
    { type: 'Door', direction: 'East', width: 0.9, height: 2.1, uValue: 3.5, shgc: 0.00, shadingFactor: 1.00 }
  ]);

  const handleNext = () => navigate('/expert/operation');
  const handlePrev = () => navigate('/expert/envelope');

  const totalGlazingArea = openings
    .filter(o => o.type === 'Window')
    .reduce((acc, curr) => acc + (curr.width * curr.height), 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#6546A5]">
            <Grid className="w-4 h-4" />
            <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Openings & Glazings</h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDE7F6] border border-[#6546A5]/25 text-[#6546A5] font-mono">
            Total Glazing Area: {totalGlazingArea.toFixed(2)} m²
          </span>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl border border-[#E5DBF5]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E5DBF5] text-[#6B5B82] font-mono bg-[#F9F6FD]">
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-2 text-center">Direction</th>
                <th className="py-2.5 px-2 text-right">Size (W x H)</th>
                <th className="py-2.5 px-2 text-right">U-Value (W/m²K)</th>
                <th className="py-2.5 px-2 text-right">SHGC</th>
                <th className="py-2.5 px-2 text-right">Shading Factor</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DBF5] font-mono">
              {openings.map((opening, index) => (
                <tr key={index} className="hover:bg-[#FAF8FD] text-[11px]">
                  <td className="py-3 px-3 font-sans font-semibold text-[#241344]">{opening.type}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                      opening.direction === 'South' ? 'bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {opening.direction}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-[#241344]">{opening.width}m x {opening.height}m</td>
                  <td className="py-3 px-2 text-right text-[#6B5B82]">{opening.uValue}</td>
                  <td className="py-3 px-2 text-right text-[#6B5B82]">{opening.shgc.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right text-[#6B5B82]">{opening.shadingFactor.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center">
                    <button className="text-[#8C7A9E] hover:text-rose-600 transition-colors p-1 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="flex items-center space-x-1.5 text-xs text-[#6546A5] hover:text-[#523587] font-bold cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Window/Door</span>
        </button>
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
          <span>Continue to Operation</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
