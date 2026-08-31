import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Flame, 
  CircleDollarSign, 
  MapPin, 
  Sun, 
  ShieldCheck, 
  Compass,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from '../components/common/Logo';

export const SimpleModePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Simple Form State
  const [formData, setFormData] = useState({
    shelterType: 'New Shelter',
    area: 45,
    occupants: 4,
    comfortPriority: 'High',
    budgetRange: 'Medium',
    heatingPreference: 'Low Energy',
    location: 'Leh, Ladakh',
    materialPreference: 'Rammed Earth & Local Stone',
    passiveSolarStrategy: 'Direct Gain South Glazing + Trombe Storage'
  });

  const locations = [
    { name: 'Leh, Ladakh', elevation: '3,500m', temp: '-12°C to 18°C', solar: '5.2 kWh/m²/d' },
    { name: 'Kargil, Ladakh', elevation: '2,676m', temp: '-15°C to 24°C', solar: '4.9 kWh/m²/d' },
    { name: 'Nubra Valley', elevation: '3,048m', temp: '-10°C to 22°C', solar: '5.4 kWh/m²/d' },
    { name: 'Dras (Coldest)', elevation: '3,280m', temp: '-22°C to 12°C', solar: '4.8 kWh/m²/d' },
    { name: 'Zanskar', elevation: '3,600m', temp: '-18°C to 16°C', solar: '5.1 kWh/m²/d' },
    { name: 'Nyoma / Changthang', elevation: '4,180m', temp: '-20°C to 15°C', solar: '5.6 kWh/m²/d' }
  ];

  // Dynamic calculations for preview card
  const estimatedCostLakh = ((formData.area * 14000) / 100000).toFixed(2);
  const estimatedHeatingDemand = formData.comfortPriority === 'High' ? 18 : 24;
  const comfortScore = formData.comfortPriority === 'High' ? 92 : 86;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 4 Complete: Trigger celebratory confetti & navigate to results
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        navigate('/results?mode=simple', {
          state: {
            simpleInputs: formData,
            comfortScore,
            estimatedCostLakh,
            estimatedHeatingDemand
          }
        });
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Fullscreen Simple Mode Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#0B2559] transition-all cursor-pointer shadow-xs"
            title="Exit to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Dashboard</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center space-x-2">
            <Logo size="sm" showSubtitle={false} />
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#DDF3E4] text-[#2E7D4F] font-mono border border-[#2E7D4F]/30 uppercase tracking-wider">
              SIMPLE MODE WIZARD
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-[#DCEEFF]/60 border border-[#2563A9]/20 rounded-full px-3 py-1 text-xs">
            <Sun className="w-3.5 h-3.5 text-[#F28C28]" />
            <span className="font-bold text-[#0B2559]">-8°C</span>
            <span className="text-[#64748B]">Leh Station</span>
          </div>

          <button
            onClick={() => navigate('/expert/project')}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#6546A5]/30 bg-[#6546A5]/10 hover:bg-[#6546A5]/20 text-[#6546A5] text-xs font-bold transition-all cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Switch to Expert Studio</span>
          </button>
        </div>
      </header>

      {/* Main Fullscreen Workspace */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Stepper Navigation */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Basic Info' },
              { num: 2, label: 'Location' },
              { num: 3, label: 'Preferences' },
              { num: 4, label: 'Review & Run' },
            ].map((step, idx) => {
              const isCompleted = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isCompleted
                        ? 'bg-[#2E7D4F] text-white'
                        : isCurrent
                          ? 'bg-[#0B2559] text-white ring-4 ring-[#DCEEFF]'
                          : 'bg-slate-100 text-[#64748B]'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:inline ${
                      isCurrent ? 'text-[#0B2559]' : 'text-[#64748B]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`flex-1 h-0.5 mx-3 ${
                      currentStep > idx + 1 ? 'bg-[#2E7D4F]' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Two Column Workspace: Wizard Form + Live Estimated Preview Card */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Form Content */}
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-xs flex flex-col justify-between">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#0B2559] mb-1 flex items-center">
                    <Compass className="w-4 h-4 mr-2 text-[#2E7D4F]" />
                    Basic Information
                  </h3>
                  <p className="text-xs text-[#64748B]">Specify the shelter dimensions and occupancy parameters</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Shelter Type</label>
                    <select
                      value={formData.shelterType}
                      onChange={(e) => setFormData({ ...formData, shelterType: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none"
                    >
                      <option>New Shelter</option>
                      <option>Retrofit Existing Building</option>
                      <option>Prefab High-Altitude Pod</option>
                      <option>Community Eco-Shelter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Built-up Area (m²)</label>
                    <input
                      type="number"
                      min="15"
                      max="500"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#64748B] mt-1">Recommended: 30–60 m² for single family or research post</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Number of Occupants</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.occupants}
                      onChange={(e) => setFormData({ ...formData, occupants: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#64748B] mt-1">Calculates internal metabolic heat gain (~80W per person)</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Comfort Priority</label>
                    <select
                      value={formData.comfortPriority}
                      onChange={(e) => setFormData({ ...formData, comfortPriority: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none"
                    >
                      <option>High (Target: 20°C–22°C Constant)</option>
                      <option>Medium (Target: 18°C–20°C)</option>
                      <option>Economy (Target: 16°C+ Survival Cold)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Budget Range</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none"
                    >
                      <option>Low (&lt; ₹5.0 Lakh)</option>
                      <option>Medium (₹5.0 – 8.0 Lakh)</option>
                      <option>High (&gt; ₹8.0 Lakh / Premium Glazing)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Heating Preference</label>
                    <select
                      value={formData.heatingPreference}
                      onChange={(e) => setFormData({ ...formData, heatingPreference: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none"
                    >
                      <option>Low Energy (Max Passive Solar + Trombe)</option>
                      <option>Zero Emission (100% Passive + Solar PV)</option>
                      <option>Hybrid (Passive Solar + Biomass Backup)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Climate */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#0B2559] mb-1">Select High-Altitude Location</h3>
                  <p className="text-xs text-[#64748B]">Micro-climate solar radiation and winter sub-zero degree days are auto-loaded</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {locations.map((loc) => (
                    <div
                      key={loc.name}
                      onClick={() => setFormData({ ...formData, location: loc.name })}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.location === loc.name
                          ? 'border-[#2E7D4F] bg-[#DDF3E4]/30 shadow-xs'
                          : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1.5 font-bold text-xs text-[#0B2559]">
                          <MapPin className="w-3.5 h-3.5 text-[#2E7D4F]" />
                          <span>{loc.name}</span>
                        </div>
                        {formData.location === loc.name && (
                          <Check className="w-4 h-4 text-[#2E7D4F]" />
                        )}
                      </div>
                      <div className="space-y-1 text-[11px] text-[#64748B]">
                        <div className="flex justify-between">
                          <span>Elevation:</span>
                          <span className="font-mono text-[#172033] font-semibold">{loc.elevation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Winter Range:</span>
                          <span className="font-mono text-[#172033]">{loc.temp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Solar Insolation:</span>
                          <span className="font-mono text-[#F28C28] font-bold">{loc.solar}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#DCEEFF]/40 border border-[#2563A9]/20 rounded-xl p-4 flex items-start space-x-3">
                  <Sun className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#0B2559] leading-relaxed">
                    <span className="font-bold block mb-0.5">High Solar Potential Detected:</span>
                    Ladakh receives over 300 sunny days per year. The platform will automatically orient primary glazing to <strong>True South (180° Azimuth)</strong> to capture maximum passive solar gains.
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Local Materials */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#0B2559] mb-1">Local Materials & Passive Strategy</h3>
                  <p className="text-xs text-[#64748B]">Select traditional Ladakhi vernacular materials and passive storage methods</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Primary Envelope Material</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { name: 'Rammed Earth & Local Stone', desc: 'High thermal inertia (300mm thick), zero embodied carbon', tag: 'Traditional' },
                        { name: 'Mud Brick (Sun-dried Adobes)', desc: 'Excellent thermal comfort, local village manufacture', tag: 'Low Cost' },
                        { name: 'Insulated Timber Frame + EPS', desc: 'Rapid assembly, ultra-high R-value insulation', tag: 'Modern' },
                        { name: 'AAC Blocks + Glass Wool Wrap', desc: 'Lightweight high-efficiency thermal barrier', tag: 'Engineered' }
                      ].map((mat) => (
                        <div
                          key={mat.name}
                          onClick={() => setFormData({ ...formData, materialPreference: mat.name })}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.materialPreference === mat.name
                              ? 'border-[#2E7D4F] bg-[#DDF3E4]/30'
                              : 'border-[#E2E8F0] hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-[#0B2559]">{mat.name}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-[#64748B]">
                              {mat.tag}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#64748B]">{mat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-2">Passive Solar Mechanism</label>
                    <select
                      value={formData.passiveSolarStrategy}
                      onChange={(e) => setFormData({ ...formData, passiveSolarStrategy: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#2563A9] focus:outline-none"
                    >
                      <option>Direct Gain South Glazing + Trombe Storage (Recommended)</option>
                      <option>Attached Solar Greenhouse / Sunspace Buffer</option>
                      <option>Water Wall Passive Thermal Storage</option>
                      <option>Phase Change Material (PCM) Thermal Ceiling Boards</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Auto Technical Inputs */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#0B2559] mb-1">Review & Synthesized Technical Parameters</h3>
                  <p className="text-xs text-[#64748B]">The system has generated high-altitude physics parameters ready for simulation</p>
                </div>

                {/* Summary table */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2">
                    <h4 className="font-bold text-[#0B2559] text-xs uppercase tracking-wider font-mono border-b border-[#E2E8F0] pb-2">
                      User Requirements
                    </h4>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Location:</span>
                      <span className="font-semibold text-[#172033]">{formData.location}</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Shelter Size:</span>
                      <span className="font-semibold text-[#172033]">{formData.area} m² ({formData.occupants} occupants)</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Material:</span>
                      <span className="font-semibold text-[#172033]">{formData.materialPreference.split('&')[0]}</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Target Comfort:</span>
                      <span className="font-semibold text-[#2E7D4F]">{formData.comfortPriority} Level</span>
                    </div>
                  </div>

                  <div className="bg-[#DDF3E4]/30 border border-[#2E7D4F]/30 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#2E7D4F]/20 pb-2">
                      <h4 className="font-bold text-[#2E7D4F] text-xs uppercase tracking-wider font-mono flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                        Auto-Derived Physics
                      </h4>
                      <span className="text-[9px] font-bold bg-[#2E7D4F] text-white px-1.5 py-0.5 rounded">ECBC Compliant</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Wall U-Value:</span>
                      <span className="font-mono text-[#0B2559] font-bold">0.22 W/m²K (R-4.5)</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Roof U-Value:</span>
                      <span className="font-mono text-[#0B2559] font-bold">0.16 W/m²K (R-6.2)</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>South Glazing Ratio:</span>
                      <span className="font-mono text-[#0B2559] font-bold">22.5% (Double Low-E)</span>
                    </div>
                    <div className="flex justify-between text-[#64748B]">
                      <span>Infiltration Rate:</span>
                      <span className="font-mono text-[#0B2559] font-bold">0.35 ACH (Airtight)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Ready to run unified thermal RC balance & multi-objective genetic optimization.</span>
                </div>
              </div>
            )}

            {/* Stepper Bottom Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-[#E2E8F0] mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold text-[#64748B] transition-colors cursor-pointer"
              >
                {currentStep === 1 ? 'Cancel' : 'Previous Step'}
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>{currentStep === 4 ? 'Run Thermal Simulation & AI' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 1 Column: Estimated Preview Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-4">
                <h3 className="font-bold text-sm text-[#0B2559]">Estimated Preview</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DDF3E4] text-[#2E7D4F] font-mono">
                  Live Model
                </span>
              </div>

              {/* 3D Visual Render Image */}
              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] shadow-inner mb-5 aspect-[4/3] bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80" 
                  alt="Estimated Passive Shelter Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
                
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20">
                  True South (180°)
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <p className="text-xs font-bold">{formData.location}</p>
                  <p className="text-[10px] text-slate-300">{formData.area} m² Passive Solar Shelter</p>
                </div>
              </div>

              {/* Preview Value Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#DDF3E4]/40 border border-[#2E7D4F]/20">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#2E7D4F]">
                    <Heart className="w-4 h-4 text-[#2E7D4F] fill-[#2E7D4F]" />
                    <span>Good Comfort</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#0B2559]">{comfortScore}/100</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF7ED] border border-[#F28C28]/20">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#F28C28]">
                    <Flame className="w-4 h-4 text-[#F28C28]" />
                    <span>Low Heating Need</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#0B2559]">{estimatedHeatingDemand} kWh/m²/yr</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#DCEEFF]/40 border border-[#2563A9]/20">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#2563A9]">
                    <CircleDollarSign className="w-4 h-4 text-[#2563A9]" />
                    <span>Cost Efficient</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#0B2559]">₹ {estimatedCostLakh} Lakh</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[10px] text-[#64748B] text-center">
              Automatic solar optimization maximizes thermal gain during Ladakh winter days (-15°C).
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-3 px-6 text-center text-xs text-[#64748B]">
        CLIMASHELTER AI • Simple Mode Passive Design Wizard
      </footer>
    </div>
  );
};
