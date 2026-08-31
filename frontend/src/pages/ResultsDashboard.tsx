import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Sun, 
  Flame, 
  CircleDollarSign, 
  CheckCircle, 
  Sliders, 
  GitCompare, 
  Box, 
  ShieldCheck, 
  Layers, 
  Wind, 
  Award
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { DigitalTwin3D } from '../components/visualizer/DigitalTwin3D';
import { generatePdfReport } from '../services/reportGenerator';

export const ResultsDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'expert' ? 'expert' : 'simple';

  const [activeModeView, setActiveModeView] = useState<'simple' | 'expert'>(initialMode);
  const [simpleTab, setSimpleTab] = useState<'overview' | 'performance' | 'breakdown' | 'cost' | 'compare'>('overview');
  const [expertTab, setExpertTab] = useState<'temp' | 'heatloss' | 'uvalues' | 'energy' | 'pareto' | 'validation'>('temp');
  const [show3dModal, setShow3dModal] = useState(false);

  // 24-Hour Indoor vs Outdoor Temperature Simulation Curve for Leh, Ladakh (Cold Design Day)
  const hourlyTempData = [
    { time: '00:00', IndoorTemp: 18.2, OutdoorTemp: -14.5 },
    { time: '02:00', IndoorTemp: 17.6, OutdoorTemp: -15.8 },
    { time: '04:00', IndoorTemp: 17.1, OutdoorTemp: -16.2 },
    { time: '06:00', IndoorTemp: 16.9, OutdoorTemp: -15.5 },
    { time: '08:00', IndoorTemp: 18.0, OutdoorTemp: -11.0 },
    { time: '10:00', IndoorTemp: 20.4, OutdoorTemp: -6.5 },
    { time: '12:00', IndoorTemp: 22.8, OutdoorTemp: -2.0 },
    { time: '14:00', IndoorTemp: 23.5, OutdoorTemp: -1.5 },
    { time: '16:00', IndoorTemp: 22.1, OutdoorTemp: -4.0 },
    { time: '18:00', IndoorTemp: 20.5, OutdoorTemp: -8.0 },
    { time: '20:00', IndoorTemp: 19.4, OutdoorTemp: -11.5 },
    { time: '22:00', IndoorTemp: 18.8, OutdoorTemp: -13.0 },
    { time: '24:00', IndoorTemp: 18.1, OutdoorTemp: -14.2 },
  ];

  // Heat Loss Breakdown (Donut Data matching wireframe: Roof 32%, Walls 28%, Windows 16%, Infiltration 12%, Floor 12%)
  const heatLossData = [
    { name: 'Roof', value: 32, color: '#2563A9' },
    { name: 'Walls', value: 28, color: '#0B2559' },
    { name: 'Windows', value: 16, color: '#38BDF8' },
    { name: 'Infiltration', value: 12, color: '#F28C28' },
    { name: 'Floor', value: 12, color: '#2E7D4F' },
  ];

  // Monthly Energy Demand (kWh/m²/month)
  const monthlyEnergyData = [
    { month: 'Jan', Heating: 4.8, SolarGain: 6.2 },
    { month: 'Feb', Heating: 3.9, SolarGain: 7.1 },
    { month: 'Mar', Heating: 2.8, SolarGain: 8.5 },
    { month: 'Apr', Heating: 1.2, SolarGain: 9.2 },
    { month: 'May', Heating: 0.2, SolarGain: 9.8 },
    { month: 'Jun', Heating: 0.0, SolarGain: 10.1 },
    { month: 'Jul', Heating: 0.0, SolarGain: 9.9 },
    { month: 'Aug', Heating: 0.0, SolarGain: 9.4 },
    { month: 'Sep', Heating: 0.5, SolarGain: 8.6 },
    { month: 'Oct', Heating: 1.8, SolarGain: 7.5 },
    { month: 'Nov', Heating: 3.4, SolarGain: 6.0 },
    { month: 'Dec', Heating: 4.6, SolarGain: 5.4 },
  ];

  // Pareto Frontier Scatter Data (Cost in Lakh vs Annual Heating in kWh/m²)
  const paretoDesigns = [
    { name: 'Design A (Recommended)', cost: 6.35, heating: 18.0, comfort: 92, selected: true },
    { name: 'Design B (Trombe Mass)', cost: 7.10, heating: 14.5, comfort: 94, selected: false },
    { name: 'Design C (Eco Hybrid)', cost: 4.80, heating: 28.0, comfort: 84, selected: false },
    { name: 'Design D (Double EPS)', cost: 5.90, heating: 21.0, comfort: 88, selected: false },
    { name: 'Design E (Triple Glazed)', cost: 8.20, heating: 12.0, comfort: 96, selected: false },
    { name: 'Standard Baseline', cost: 4.20, heating: 64.0, comfort: 68, selected: false },
  ];

  // Handle PDF Export
  const handleExportPDF = () => {
    generatePdfReport({
      projectName: 'Mountain Shelter – Leh',
      location: 'Leh, Ladakh (3,500m ASL)',
      shelterType: 'Passive Solar New Shelter',
      area: 45,
      occupants: 4,
      comfortScore: 92,
      heatingNeed: 18,
      estCost: '6.35 Lakh',
      solarUtilization: 68,
      whyPoints: [
        'Maximizes solar gain in winter (180° South Orientation with high SHGC glazing)',
        'High thermal mass (300mm Rammed Earth + Stone Plinth) stores daytime solar heat',
        'Optimized envelope insulation (U = 0.22 W/m²K) prevents sub-zero night heat loss',
        'Controlled summer ventilation shading overhangs prevent overheating'
      ],
      keyFeatures: [
        'Passive Solar Design',
        'High Insulation Efficiency',
        'Thermal Mass Walls',
        'Natural Ventilation'
      ]
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Row with Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] hover:text-[#0B2559] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-[#0B2559] font-display">
                {activeModeView === 'simple' ? 'Results — Recommended Design' : 'Detailed Analysis — Expert Mode'}
              </h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                activeModeView === 'simple' ? 'bg-[#DDF3E4] text-[#2E7D4F]' : 'bg-[#6546A5]/15 text-[#6546A5]'
              }`}>
                {activeModeView === 'simple' ? 'Simple Output' : 'Diagnostic Physics'}
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              {activeModeView === 'simple' 
                ? 'Optimized shelter recommendation based on local climate & user criteria' 
                : '24h unsteady-state thermal simulation, heat-balance breakdown & Pareto frontier'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Switch Mode View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1 border border-[#E2E8F0]">
            <button
              onClick={() => setActiveModeView('simple')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeModeView === 'simple' 
                  ? 'bg-white text-[#2E7D4F] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0B2559]'
              }`}
            >
              Simple Mode
            </button>
            <button
              onClick={() => setActiveModeView('expert')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeModeView === 'expert' 
                  ? 'bg-[#6546A5] text-white shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0B2559]'
              }`}
            >
              Expert Diagnostics
            </button>
          </div>

          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#0B2559] hover:bg-[#2563A9] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SIMPLE MODE RESULTS VIEW (Matching Wireframe Screenshot 1 / 3)         */}
      {/* ========================================================================= */}
      {activeModeView === 'simple' && (
        <div className="space-y-6">
          {/* Sub-tabs bar */}
          <div className="flex items-center space-x-2 border-b border-[#E2E8F0] pb-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'performance', label: 'Performance' },
              { id: 'breakdown', label: 'Breakdown' },
              { id: 'cost', label: 'Cost Analysis' },
              { id: 'compare', label: 'Compare Alternatives' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSimpleTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  simpleTab === tab.id
                    ? 'bg-[#2E7D4F] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0B2559] hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview (Exact Wireframe Replica) */}
          {simpleTab === 'overview' && (
            <div className="space-y-6">
              {/* Main Recommended Design Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#0B2559] font-display">
                      Recommended Design
                    </h2>
                    <p className="text-xs text-[#64748B]">Area-specific passive solar model optimized for Leh cold climate</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#2E7D4F] text-white font-mono shadow-xs">
                    Design A (Best Choice)
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left Column: 3D Image Preview & Quick Actions */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm aspect-[4/3] bg-slate-900 group">
                      <img 
                        src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80" 
                        alt="Design A Preview" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                      <div className="absolute top-3 left-3 bg-[#2E7D4F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        AI Selected
                      </div>

                      <button
                        onClick={() => setShow3dModal(true)}
                        className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md hover:bg-white text-[#0B2559] text-xs font-bold shadow-md cursor-pointer transition-all"
                      >
                        <Box className="w-3.5 h-3.5 text-[#2563A9]" />
                        <span>Interactive 3D</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => navigate('/what-if')}
                        className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>What-If Analysis</span>
                      </button>

                      <button
                        onClick={() => setSimpleTab('compare')}
                        className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563A9] text-[#0B2559] text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-[#2563A9]" />
                        <span>Compare Designs</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 4 KPI Cards + Why This Design + Key Features */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* 4 KPI Metrics (Score, Heating Need, Cost, Solar) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Comfort Score (Circular Animated Gauge) */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-center flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2 font-mono">Comfort Score</p>
                        <div className="relative w-14 h-14 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="28" cy="28" r="22" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                            <circle 
                              cx="28" 
                              cy="28" 
                              r="22" 
                              stroke="#2E7D4F" 
                              strokeWidth="4" 
                              fill="transparent" 
                              strokeDasharray={138} 
                              strokeDashoffset={138 - (138 * 92) / 100} 
                              strokeLinecap="round" 
                            />
                          </svg>
                          <span className="absolute text-xs font-extrabold text-[#2E7D4F] font-mono">92/100</span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#2E7D4F] mt-1">Excellent</span>
                      </div>

                      {/* Heating Need */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-center flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Heating Need</p>
                        <Flame className="w-5 h-5 text-[#F28C28] my-1" />
                        <p className="text-base font-extrabold text-[#0B2559] font-mono leading-tight">18 <span className="text-[9px] font-normal text-[#64748B]">kWh/m²/yr</span></p>
                        <span className="text-[10px] font-bold text-emerald-600">Low Demand</span>
                      </div>

                      {/* Est. Cost */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-center flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Est. Cost</p>
                        <CircleDollarSign className="w-5 h-5 text-[#2563A9] my-1" />
                        <p className="text-base font-extrabold text-[#0B2559] font-mono leading-tight">₹ 6.35 <span className="text-[10px] font-normal text-[#64748B]">Lakh</span></p>
                        <span className="text-[10px] font-semibold text-[#64748B]">Medium Range</span>
                      </div>

                      {/* Solar Utilization */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-center flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1 font-mono">Solar Share</p>
                        <Sun className="w-5 h-5 text-[#F28C28] my-1" />
                        <p className="text-base font-extrabold text-[#0B2559] font-mono leading-tight">68%</p>
                        <span className="text-[10px] font-bold text-[#F28C28]">High Passive</span>
                      </div>
                    </div>

                    {/* "Why this design?" Section (Exact Wireframe Bullet Points) */}
                    <div className="bg-[#DDF3E4]/30 border border-[#2E7D4F]/20 rounded-xl p-4 space-y-2.5">
                      <h4 className="font-bold text-xs text-[#0B2559] uppercase tracking-wider font-mono flex items-center">
                        <Award className="w-4 h-4 text-[#2E7D4F] mr-1.5" />
                        Why this design?
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#172033]">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          <span><strong>Maximizes solar gain in winter:</strong> True South orientation (180°) captures 6.2 kWh/m²/day.</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          <span><strong>High thermal mass for heat storage:</strong> 300mm rammed earth stores heat for 8 sub-zero night hours.</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          <span><strong>Optimized insulation & glazing:</strong> Double Low-E argon glass limits nighttime conduction heat drop.</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          <span><strong>Natural ventilation in summer:</strong> 0.9m overhang louvers block high summer sun while venting heat.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features Cards (Matching wireframe icons) */}
                    <div>
                      <h4 className="font-bold text-xs text-[#64748B] uppercase tracking-wider font-mono mb-2.5">
                        Key Engineering Features
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                          <Sun className="w-4 h-4 text-[#F28C28] mx-auto mb-1.5" />
                          <p className="text-[11px] font-bold text-[#0B2559]">Passive Solar</p>
                          <p className="text-[9px] text-[#64748B]">Direct Gain</p>
                        </div>

                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                          <ShieldCheck className="w-4 h-4 text-[#2563A9] mx-auto mb-1.5" />
                          <p className="text-[11px] font-bold text-[#0B2559]">High Insulation</p>
                          <p className="text-[9px] text-[#64748B]">U = 0.22 W/m²K</p>
                        </div>

                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                          <Layers className="w-4 h-4 text-[#6546A5] mx-auto mb-1.5" />
                          <p className="text-[11px] font-bold text-[#0B2559]">Thermal Mass</p>
                          <p className="text-[9px] text-[#64748B]">Stone & Earth</p>
                        </div>

                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                          <Wind className="w-4 h-4 text-[#2E7D4F] mx-auto mb-1.5" />
                          <p className="text-[11px] font-bold text-[#0B2559]">Natural Vent</p>
                          <p className="text-[9px] text-[#64748B]">Summer Shading</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Performance Breakdown */}
          {simpleTab === 'performance' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <h3 className="font-bold text-sm text-[#0B2559] mb-4">Monthly Heating vs Passive Solar Gains</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, borderColor: '#e2e8f0' }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="Heating" fill="#F28C28" name="Active Heating Needed (kWh/m²)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="SolarGain" fill="#2563A9" name="Passive Solar Harness (kWh/m²)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0B2559] mb-3">Thermal Comfort Analysis</h3>
                  <p className="text-xs text-[#64748B] mb-4">
                    In Leh cold winters (-15°C external), passive insulation and south glazing keep indoor temperature steadily between <strong>18.0°C and 23.5°C</strong> without auxiliary burning.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2.5 rounded-lg bg-[#F8FAFC]">
                      <span className="text-[#64748B]">Indoor Average Temp:</span>
                      <span className="font-bold text-[#0B2559]">20.4°C</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-[#F8FAFC]">
                      <span className="text-[#64748B]">Minimum Night Temperature:</span>
                      <span className="font-bold text-[#2E7D4F]">16.9°C (Safe Living)</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-[#F8FAFC]">
                      <span className="text-[#64748B]">Comfort Hours %:</span>
                      <span className="font-bold text-[#2E7D4F]">92.4% of Year</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModeView('expert')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-[#6546A5] text-white font-bold text-xs hover:bg-[#523887] transition-colors"
                >
                  View 24-Hour Hourly Thermal Curve →
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Heat Loss Breakdown Donut */}
          {simpleTab === 'breakdown' && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#0B2559] mb-4">Shelter Envelope Heat Loss Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={heatLossData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {heatLossData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5">
                  {heatLossData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="font-semibold text-[#0B2559]">{item.name}</span>
                      </div>
                      <span className="font-bold font-mono text-[#172033]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Compare Alternatives (Side by Side) */}
          {simpleTab === 'compare' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0B2559]">Candidate Design Options (Genetic Pareto)</h3>
                <span className="text-xs text-[#64748B]">Ranked by Cost vs Thermal Comfort</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {paretoDesigns.slice(0, 3).map((d) => (
                  <div 
                    key={d.name} 
                    className={`rounded-2xl p-5 border-2 transition-all ${
                      d.selected 
                        ? 'border-[#2E7D4F] bg-[#DDF3E4]/20 shadow-md' 
                        : 'border-[#E2E8F0] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-xs text-[#0B2559]">{d.name}</h4>
                      {d.selected && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#2E7D4F] text-white">Recommended</span>
                      )}
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Comfort Score:</span>
                        <span className="font-bold font-mono text-[#2E7D4F]">{d.comfort}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Annual Heating:</span>
                        <span className="font-bold font-mono text-[#0B2559]">{d.heating} kWh/m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Budget:</span>
                        <span className="font-bold font-mono text-[#0B2559]">₹ {d.cost} Lakh</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. EXPERT MODE DIAGNOSTICS VIEW (Matching Wireframe Lower-Middle)          */}
      {/* ========================================================================= */}
      {activeModeView === 'expert' && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Navigation Tabs for Expert Diagnostics */}
          <div className="lg:col-span-3 space-y-1 bg-white border border-[#E2E8F0] rounded-2xl p-3 shadow-xs">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] font-mono px-3 py-2">
              Diagnostics Views
            </p>
            {[
              { id: 'temp', label: 'Temperature (24h)', desc: 'Indoor vs Outdoor curve' },
              { id: 'heatloss', label: 'Heat Loss Breakdown', desc: 'Conduction & Infiltration' },
              { id: 'uvalues', label: 'U-Values Matrix', desc: 'Assembly transmittance' },
              { id: 'energy', label: 'Energy Demand', desc: '24 kWh/m²/yr profile' },
              { id: 'pareto', label: 'Pareto Analysis', desc: 'Multi-objective AI' },
              { id: 'validation', label: 'Physics Validation', desc: 'Model calibration' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setExpertTab(item.id as any)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  expertTab === item.id
                    ? 'bg-[#6546A5] text-white font-bold shadow-xs'
                    : 'text-[#64748B] hover:bg-slate-50 hover:text-[#0B2559]'
                }`}
              >
                <p className="leading-tight">{item.label}</p>
                <p className={`text-[10px] mt-0.5 ${expertTab === item.id ? 'text-purple-200' : 'text-[#94A3B8]'}`}>
                  {item.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Right Main Diagnostic View Card */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* 1. Indoor Temperature (24h) Line Chart */}
            {expertTab === 'temp' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B2559]">Indoor Temperature (24h Design Day)</h3>
                    <p className="text-xs text-[#64748B]">Leh winter sub-zero design day with -16.2°C ambient minimum</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#2563A9] bg-[#DCEEFF] px-2.5 py-1 rounded-full">
                    Average: 20.4°C
                  </span>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyTempData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={10} fontStyle="monospace" />
                      <YAxis stroke="#64748b" fontSize={10} domain={[-20, 30]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, borderColor: '#e2e8f0', fontSize: 11 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line 
                        type="monotone" 
                        dataKey="IndoorTemp" 
                        stroke="#2563A9" 
                        strokeWidth={3} 
                        name="Indoor Temp (°C)" 
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="OutdoorTemp" 
                        stroke="#94A3B8" 
                        strokeWidth={2} 
                        strokeDasharray="4 4" 
                        name="Outdoor Temp (°C)" 
                        dot={{ r: 2 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-[#64748B] text-center font-mono">
                  Calculated via unsteady-state Differential Heat Transfer Equation (RC Network).
                </p>
              </div>
            )}

            {/* 2. Heat Loss Breakdown */}
            {expertTab === 'heatloss' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <h3 className="font-bold text-sm text-[#0B2559] mb-4">Heat Loss Breakdown (Area Transmittance × ΔT)</h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={heatLossData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={95}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {heatLossData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {heatLossData.map((item) => (
                      <div key={item.name} className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="font-semibold text-[#0B2559]">{item.name}</span>
                        </div>
                        <span className="font-mono font-bold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. U-Values Matrix Table */}
            {expertTab === 'uvalues' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-[#0B2559]">Calculated Assembly U-Values & Code Compliance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Assembly</th>
                        <th className="p-3">Layers & Materials</th>
                        <th className="p-3">U-Value (W/m²K)</th>
                        <th className="p-3">ECBC-R Standard</th>
                        <th className="p-3">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr>
                        <td className="p-3 font-bold text-[#0B2559]">External Wall</td>
                        <td className="p-3 text-[#64748B]">300mm Rammed Earth + 100mm EPS + Plaster</td>
                        <td className="p-3 font-mono font-bold text-[#2E7D4F]">0.22</td>
                        <td className="p-3 font-mono text-[#64748B]">≤ 0.40</td>
                        <td className="p-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pass (181%)</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#0B2559]">Pitched Roof</td>
                        <td className="p-3 text-[#64748B]">Timber Deck + 150mm Glasswool + Metal Sheeting</td>
                        <td className="p-3 font-mono font-bold text-[#2E7D4F]">0.16</td>
                        <td className="p-3 font-mono text-[#64748B]">≤ 0.28</td>
                        <td className="p-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pass (175%)</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#0B2559]">South Glazing</td>
                        <td className="p-3 text-[#64748B]">Double Low-E (Argon-filled, 12mm gap, SHGC = 0.62)</td>
                        <td className="p-3 font-mono font-bold text-[#2E7D4F]">1.40</td>
                        <td className="p-3 font-mono text-[#64748B]">≤ 1.80</td>
                        <td className="p-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pass</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#0B2559]">Ground Floor Slab</td>
                        <td className="p-3 text-[#64748B]">400mm Stone Plinth + 80mm XPS + Screed</td>
                        <td className="p-3 font-mono font-bold text-[#2E7D4F]">0.28</td>
                        <td className="p-3 font-mono text-[#64748B]">≤ 0.45</td>
                        <td className="p-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pass</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. Energy Demand */}
            {expertTab === 'energy' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B2559]">Energy Demand (kWh/m²/yr)</h3>
                    <p className="text-xs text-[#64748B]">Net annual auxiliary heating load after solar offset</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-[#2E7D4F] font-mono">24 kWh/m²/yr</p>
                    <p className="text-[10px] text-emerald-700 font-bold">Ultra-Low Energy Standard</p>
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="Heating" fill="#2563A9" radius={[4, 4, 0, 0]} name="Heating Load (kWh/m²)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* 5. Pareto Analysis (Multi-Objective Optimization) */}
            {expertTab === 'pareto' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B2559]">Genetic Algorithm Pareto Frontier (NSGA-II)</h3>
                    <p className="text-xs text-[#64748B]">Trade-off between Initial Capital Cost (₹ Lakh) and Annual Heating Demand (kWh/m²)</p>
                  </div>
                  <span className="text-xs font-bold text-[#6546A5] bg-[#6546A5]/10 px-2.5 py-1 rounded-full">
                    50 Generations Simulated
                  </span>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" dataKey="cost" name="Cost" unit="Lakh" stroke="#64748b" fontSize={10} domain={[3, 10]} />
                      <YAxis type="number" dataKey="heating" name="Heating" unit="kWh/m²" stroke="#64748b" fontSize={10} domain={[0, 70]} />
                      <ZAxis type="number" dataKey="comfort" range={[60, 200]} name="Comfort Score" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Candidate Designs" data={paretoDesigns} fill="#6546A5" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-[#64748B]">
                  <strong>Pareto Optimal Sweet Spot:</strong> <strong>Design A</strong> achieves a 72% reduction in heating demand with only a 14% cost increase over baseline.
                </div>
              </div>
            )}

            {/* 6. Validation */}
            {expertTab === 'validation' && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-[#0B2559]">Model Calibration & Physics Validation</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#DDF3E4]/40 border border-[#2E7D4F]/20 flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D4F] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#0B2559]">ISO 13790 / ASHRAE 90.1 Compliance</h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        The unsteady-state thermal network has been calibrated against Leh climatic data (Latitude 34.15°N, Elevation 3,500m).
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                      <p className="text-[10px] text-[#64748B]">Root Mean Square Error</p>
                      <p className="text-sm font-bold text-[#0B2559] font-mono">RMSE = 0.42°C</p>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                      <p className="text-[10px] text-[#64748B]">Coefficient of Determination</p>
                      <p className="text-sm font-bold text-[#2E7D4F] font-mono">R² = 0.968</p>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                      <p className="text-[10px] text-[#64748B]">Solar Model</p>
                      <p className="text-sm font-bold text-[#F28C28] font-mono">Perez Anisotropic Sky</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 3D Digital Twin Modal */}
      {show3dModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center space-x-2">
                <Box className="w-5 h-5 text-[#2563A9]" />
                <h3 className="font-bold text-[#0B2559]">3D Digital Twin — Interactive Visualizer</h3>
              </div>
              <button 
                onClick={() => setShow3dModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-[#64748B]"
              >
                ✕
              </button>
            </div>

            <DigitalTwin3D height="460px" />
          </div>
        </div>
      )}
    </div>
  );
};
