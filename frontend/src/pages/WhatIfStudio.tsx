import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sliders, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles
} from 'lucide-react';
import { DigitalTwin3D } from '../components/visualizer/DigitalTwin3D';

export const WhatIfStudio: React.FC = () => {
  const navigate = useNavigate();

  // Baseline Default values
  const baseline = {
    insulationMm: 100,
    orientation: 180, // True South
    wwr: 22, // Window to wall %
    glazingType: 'Double Low-E Argon',
    pcmActivated: true,
  };

  // Interactive Sliders State
  const [insulationMm, setInsulationMm] = useState(100);
  const [orientation, setOrientation] = useState(180);
  const [wwr, setWwr] = useState(22);
  const [glazingType, setGlazingType] = useState('Double Low-E Argon');
  const [pcmActivated, setPcmActivated] = useState(true);

  // Real-time Physics & Cost Solver
  const metrics = useMemo(() => {
    // 1. Orientation solar factor (Max at 180° South, drops toward North 0°/360°)
    const angleDelta = Math.abs(orientation - 180);
    const solarFactor = Math.max(0.2, Math.cos((angleDelta * Math.PI) / 180));

    // 2. Glazing U-value & SHGC factor
    let glazingU = 1.4;
    let shgc = 0.62;
    let glazingCostDelta = 0;
    if (glazingType === 'Single Clear') {
      glazingU = 5.8;
      shgc = 0.85;
      glazingCostDelta = -0.5;
    } else if (glazingType === 'Double Standard') {
      glazingU = 2.8;
      shgc = 0.72;
      glazingCostDelta = -0.2;
    } else if (glazingType === 'Triple Argon Low-E') {
      glazingU = 0.8;
      shgc = 0.55;
      glazingCostDelta = 0.8;
    }

    // 3. Wall U-value from insulation thickness
    const wallU = 1 / (1 / 1.3 + (insulationMm / 1000) / 0.035 + 0.13);

    // 4. Heating Demand Calculation (kWh/m²/yr)
    // Base heat loss minus solar heat gain
    const grossHeatLoss = (wallU * 85 + (wwr / 100 * 25) * glazingU + 0.16 * 45) * 1.8;
    const solarGainUseful = (wwr / 100 * 25) * 5.2 * 180 * solarFactor * shgc * 0.75;
    const pcmReduction = pcmActivated ? 3.5 : 0;

    const netHeating = Math.max(8.0, Math.round(((grossHeatLoss * 24 * 180) / 1000 - (solarGainUseful / 45)) - pcmReduction));

    // 5. Comfort Score (0-100)
    let score = 95 - Math.max(0, (netHeating - 15) * 1.2) - (angleDelta > 45 ? 8 : 0);
    if (!pcmActivated) score -= 4;
    if (glazingType === 'Single Clear') score -= 18;
    score = Math.min(99, Math.max(45, Math.round(score)));

    // 6. Cost in Lakhs
    const insulationCostLakh = (insulationMm / 100) * 0.45;
    const pcmCostLakh = pcmActivated ? 0.35 : 0;
    const totalCost = Number((5.5 + insulationCostLakh + glazingCostDelta + pcmCostLakh).toFixed(2));

    // 7. Solar Utilization %
    const solarShare = Math.min(88, Math.max(15, Math.round(solarFactor * (wwr / 22) * 68)));

    return {
      netHeating,
      comfortScore: score,
      totalCost,
      solarShare,
      wallU: wallU.toFixed(2),
    };
  }, [insulationMm, orientation, wwr, glazingType, pcmActivated]);

  const handleReset = () => {
    setInsulationMm(baseline.insulationMm);
    setOrientation(baseline.orientation);
    setWwr(baseline.wwr);
    setGlazingType(baseline.glazingType);
    setPcmActivated(baseline.pcmActivated);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/results')}
            className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] hover:text-[#0B2559] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-[#F28C28]" />
              Real-Time What-If Analysis Studio
            </h1>
            <p className="text-xs text-[#64748B]">
              Slide parameters to see instant thermal & cost re-simulations
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563A9] text-[#0B2559] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Two Column Layout: Interactive Sliders vs Live Twin & Metrics */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Parameter Controls */}
        <div className="lg:col-span-5 space-y-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <div>
            <h3 className="font-bold text-sm text-[#0B2559]">Design Variables</h3>
            <p className="text-xs text-[#64748B]">Adjust envelope, orientation, and fenestration</p>
          </div>

          {/* 1. Wall Insulation Thickness */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0B2559]">Wall EPS Insulation</span>
              <span className="font-mono font-bold text-[#2563A9] bg-[#DCEEFF] px-2 py-0.5 rounded">
                {insulationMm} mm (U = {metrics.wallU} W/m²K)
              </span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="200" 
              step="10"
              value={insulationMm}
              onChange={(e) => setInsulationMm(Number(e.target.value))}
              className="w-full accent-[#2563A9] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>20mm (Low)</span>
              <span>100mm (Standard)</span>
              <span>200mm (Passive House)</span>
            </div>
          </div>

          {/* 2. Building Orientation Azimuth */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0B2559]">Orientation Azimuth</span>
              <span className="font-mono font-bold text-[#F28C28] bg-orange-50 px-2 py-0.5 rounded">
                {orientation}° {orientation === 180 ? '(True South ★)' : orientation === 90 ? '(East)' : orientation === 270 ? '(West)' : '(North)'}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="360" 
              step="15"
              value={orientation}
              onChange={(e) => setOrientation(Number(e.target.value))}
              className="w-full accent-[#F28C28] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>0° (North)</span>
              <span>180° (South)</span>
              <span>360° (North)</span>
            </div>
          </div>

          {/* 3. Window-to-Wall Ratio (WWR) */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0B2559]">South Glazing Ratio (WWR)</span>
              <span className="font-mono font-bold text-[#2E7D4F] bg-[#DDF3E4] px-2 py-0.5 rounded">
                {wwr}% Facade Area
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="45" 
              step="2"
              value={wwr}
              onChange={(e) => setWwr(Number(e.target.value))}
              className="w-full accent-[#2E7D4F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>10% (Minimal)</span>
              <span>22% (Optimized)</span>
              <span>45% (High Solar)</span>
            </div>
          </div>

          {/* 4. Glazing Spec */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <label className="block text-xs font-bold text-[#0B2559]">Glazing Specification</label>
            <select
              value={glazingType}
              onChange={(e) => setGlazingType(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#E2E8F0] bg-white focus:outline-none"
            >
              <option>Single Clear (U=5.8 W/m²K)</option>
              <option>Double Standard (U=2.8 W/m²K)</option>
              <option>Double Low-E Argon (U=1.4 W/m²K, SHGC=0.62)</option>
              <option>Triple Argon Low-E (U=0.8 W/m²K, SHGC=0.55)</option>
            </select>
          </div>

          {/* 5. PCM / Trombe Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div>
              <p className="text-xs font-bold text-[#0B2559]">Phase Change Material (PCM)</p>
              <p className="text-[10px] text-[#64748B]">Melting point 21°C latent heat ceiling board</p>
            </div>
            <button
              onClick={() => setPcmActivated(!pcmActivated)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                pcmActivated ? 'bg-[#2E7D4F]' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                pcmActivated ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Dynamic Output KPIs & 3D Interactive Model */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Recalculated KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-center shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Comfort Score</p>
              <p className="text-2xl font-extrabold text-[#2E7D4F] font-mono leading-tight">{metrics.comfortScore}/100</p>
              <span className="text-[10px] font-semibold text-[#64748B] flex items-center justify-center mt-1">
                {metrics.comfortScore >= 90 ? '★ Optimal' : metrics.comfortScore >= 80 ? 'Acceptable' : 'Sub-Optimal'}
              </span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-center shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Heating Need</p>
              <p className="text-2xl font-extrabold text-[#F28C28] font-mono leading-tight">{metrics.netHeating}</p>
              <span className="text-[10px] font-semibold text-[#64748B]">kWh/m²/yr</span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-center shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Est. Cost</p>
              <p className="text-2xl font-extrabold text-[#0B2559] font-mono leading-tight">₹ {metrics.totalCost}</p>
              <span className="text-[10px] font-semibold text-[#64748B]">Lakhs</span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-center shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Solar Share</p>
              <p className="text-2xl font-extrabold text-[#2563A9] font-mono leading-tight">{metrics.solarShare}%</p>
              <span className="text-[10px] font-semibold text-[#64748B]">Passive Gain</span>
            </div>
          </div>

          {/* Interactive 3D Digital Twin Visualizer */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0B2559] uppercase tracking-wider font-mono">
                Live 3D Digital Twin Response
              </h4>
              <span className="text-[10px] text-[#64748B] font-mono">
                Wall EPS: {insulationMm}mm • Azimuth: {orientation}°
              </span>
            </div>

            <DigitalTwin3D 
              shelterArea={45}
              orientationDeg={orientation}
              wallInsulationMm={insulationMm}
              height="360px"
            />
          </div>

          {/* Insight Callout */}
          <div className="p-4 rounded-xl bg-[#DDF3E4]/40 border border-[#2E7D4F]/30 text-xs text-[#0B2559] flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#2E7D4F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Real-Time Solver Takeaway:</span>
              Increasing EPS insulation beyond 100mm provides diminishing returns in Leh unless south orientation is maintained within ±15° of True South (180°).
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
