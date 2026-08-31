import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Layers, Plus, Trash2 } from 'lucide-react';

interface MaterialLayer {
  name: string;
  thickness: number; // m
  k: number; // Thermal conductivity W/mK
  density: number; // kg/m3
  specificHeat: number; // J/kgK
}

export const EnvelopeSetup: React.FC = () => {
  const navigate = useNavigate();

  const [wallLayers] = useState<MaterialLayer[]>([
    { name: 'Rammed Earth & Local Granite Plinth', thickness: 0.30, k: 1.1, density: 1950, specificHeat: 1100 },
    { name: 'Expanded Polystyrene (EPS Insulation)', thickness: 0.08, k: 0.035, density: 25, specificHeat: 1450 }
  ]);

  const [roofLayers] = useState<MaterialLayer[]>([
    { name: 'Poplar / Willow Timber Roof Joists', thickness: 0.15, k: 0.13, density: 520, specificHeat: 1600 },
    { name: 'High-Efficiency Mineral Wool Wrap', thickness: 0.12, k: 0.038, density: 32, specificHeat: 840 }
  ]);

  const calculateUValue = (layers: MaterialLayer[]) => {
    const rFilm = 0.17; // standard indoor + outdoor surface resistance
    const rMaterial = layers.reduce((acc, curr) => acc + (curr.thickness / curr.k), 0);
    const rTotal = rFilm + rMaterial;
    return rTotal > 0 ? (1 / rTotal).toFixed(3) : '0.000';
  };

  const wallUValue = calculateUValue(wallLayers);
  const roofUValue = calculateUValue(roofLayers);

  const handleNext = () => navigate('/expert/openings');
  const handlePrev = () => navigate('/expert/geometry');

  return (
    <div className="space-y-6">
      {/* Wall Assemblies */}
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#6546A5]">
            <Layers className="w-4 h-4" />
            <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">External Wall Layers</h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDE7F6] border border-[#6546A5]/25 text-[#6546A5] font-mono">
            U-Value: {wallUValue} W/m²K
          </span>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl border border-[#E5DBF5]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E5DBF5] text-[#6B5B82] font-mono bg-[#F9F6FD]">
                <th className="py-2.5 px-3">Material Layer Name</th>
                <th className="py-2.5 px-2 text-right">Thickness (m)</th>
                <th className="py-2.5 px-2 text-right">k (W/mK)</th>
                <th className="py-2.5 px-2 text-right">Density (kg/m³)</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DBF5]">
              {wallLayers.map((layer, index) => (
                <tr key={index} className="hover:bg-[#FAF8FD]">
                  <td className="py-3 px-3 font-semibold text-[#241344]">{layer.name}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#241344]">{layer.thickness}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#6B5B82]">{layer.k}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#6B5B82]">{layer.density}</td>
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
          <span>Add Custom Layer</span>
        </button>
      </div>

      {/* Roof Assemblies */}
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#6546A5]">
            <Layers className="w-4 h-4" />
            <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Roof Assembly Layers</h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDE7F6] border border-[#6546A5]/25 text-[#6546A5] font-mono">
            U-Value: {roofUValue} W/m²K
          </span>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl border border-[#E5DBF5]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E5DBF5] text-[#6B5B82] font-mono bg-[#F9F6FD]">
                <th className="py-2.5 px-3">Material Layer Name</th>
                <th className="py-2.5 px-2 text-right">Thickness (m)</th>
                <th className="py-2.5 px-2 text-right">k (W/mK)</th>
                <th className="py-2.5 px-2 text-right">Density (kg/m³)</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DBF5]">
              {roofLayers.map((layer, index) => (
                <tr key={index} className="hover:bg-[#FAF8FD]">
                  <td className="py-3 px-3 font-semibold text-[#241344]">{layer.name}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#241344]">{layer.thickness}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#6B5B82]">{layer.k}</td>
                  <td className="py-3 px-2 text-right font-mono text-[#6B5B82]">{layer.density}</td>
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
          <span>Add Custom Layer</span>
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
          <span>Continue to Openings</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
