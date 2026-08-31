import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Navigation, Sun } from 'lucide-react';

export const ProjectSetup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Leh Passive Shelter');
  const [city, setCity] = useState('Leh');
  const [country, setCountry] = useState('India');
  const [lat, setLat] = useState(34.15);
  const [lng, setLng] = useState(77.57);
  const [elev, setElev] = useState(3500);

  const handleNext = () => {
    navigate('/expert/geometry');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Meta Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Climate Fingerprint Mode</label>
            <select className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10">
              <option value="cold-dry">Cold & Dry Presets (Leh, Ladakh)</option>
              <option value="warm-humid">Warm & Humid Presets (Coastal)</option>
              <option value="composite">Composite Presets (North Plains)</option>
              <option value="custom">Custom Solar Dataset</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8FD] border border-[#E5DBF5] rounded-2xl p-6 space-y-6">
        <div className="flex items-center space-x-2 text-[#6546A5]">
          <Navigation className="w-4 h-4" />
          <h3 className="text-xs font-bold text-[#6546A5] uppercase tracking-wider font-mono">Geographic Location</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Latitude (°N)</label>
            <input
              type="number"
              step="0.01"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Longitude (°E)</label>
            <input
              type="number"
              step="0.01"
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Elevation (m above sea level)</label>
            <input
              type="number"
              value={elev}
              onChange={(e) => setElev(parseInt(e.target.value) || 0)}
              className="w-full bg-white border border-[#DCD0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#241344] focus:outline-none focus:border-[#6546A5] focus:ring-2 focus:ring-[#6546A5]/10 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-[#4A3B66] font-bold">Data Feed Source</label>
            <div className="text-xs text-[#D97706] font-semibold flex items-center bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-3.5 h-10 select-none">
              <Sun className="w-4 h-4 mr-2 text-[#F59E0B]" />
              MOCK_DATA (Offline climate dataset loaded)
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#E5DBF5]">
        <span className="text-[10px] text-[#6B5B82] font-mono">Changes auto-saved locally</span>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#6546A5] hover:bg-[#523587] transition-all text-xs font-bold text-white shadow-xs cursor-pointer"
        >
          <span>Continue to Geometry</span>
          <Save className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
