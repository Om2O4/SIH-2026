import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Cpu, 
  ArrowRight, 
  Sun, 
  PlusCircle, 
  Building, 
  Flame, 
  Leaf, 
  CircleDollarSign, 
  BarChart3, 
  MapPin,
  Clock,
  CheckCircle2,
  Box,
  Download,
  Search
} from 'lucide-react';
import { CreateProjectModal } from '../components/common/CreateProjectModal';
import { generatePdfReport } from '../services/reportGenerator';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projectTab, setProjectTab] = useState<'all' | 'working' | 'completed'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Working & Completed Projects Database
  const allProjects = [
    {
      id: 'proj-1',
      title: 'Mountain Shelter – Leh',
      location: 'Leh, Ladakh (3,500m ASL)',
      category: 'working',
      mode: 'Simple Mode',
      modeBadge: 'bg-[#DDF3E4] text-[#2E7D4F] border-[#2E7D4F]/30',
      progressPercent: 65,
      currentStage: 'Envelope & U-Value Synthesis',
      modified: '2 hours ago',
      specs: '45 m² • 4 Occupants • Target 20°C',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
      actionPath: '/simple',
      actionLabel: 'Continue Working'
    },
    {
      id: 'proj-2',
      title: 'Off-grid Cabin – Kargil',
      location: 'Kargil, Ladakh (2,676m ASL)',
      category: 'working',
      mode: 'Expert Mode',
      modeBadge: 'bg-[#6546A5]/10 text-[#6546A5] border-[#6546A5]/30',
      progressPercent: 40,
      currentStage: 'Trombe Mass & Openings Setup',
      modified: '1 day ago',
      specs: '72 m² • Granite Trombe • Heavy Mass',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      actionPath: '/expert/envelope',
      actionLabel: 'Continue Working'
    },
    {
      id: 'proj-3',
      title: 'Research Shelter – Nubra',
      location: 'Diskit, Nubra (3,048m ASL)',
      category: 'completed',
      mode: 'Expert Mode',
      modeBadge: 'bg-[#6546A5]/10 text-[#6546A5] border-[#6546A5]/30',
      comfortScore: 92,
      heatingNeed: '18.0 kWh/m²/yr',
      cost: '₹ 6.35 Lakh',
      modified: '3 days ago',
      specs: '120 m² • 92/100 Comfort • Direct Gain',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
      actionPath: '/results?mode=expert',
      actionLabel: 'View Results & Diagnostics'
    },
    {
      id: 'proj-4',
      title: 'High-Altitude Eco-Pod – Nyoma',
      location: 'Nyoma, Changthang (4,180m ASL)',
      category: 'completed',
      mode: 'Simple Mode',
      modeBadge: 'bg-[#DDF3E4] text-[#2E7D4F] border-[#2E7D4F]/30',
      comfortScore: 94,
      heatingNeed: '14.5 kWh/m²/yr',
      cost: '₹ 5.90 Lakh',
      modified: '5 days ago',
      specs: '36 m² • 94/100 Comfort • Super-Insulated',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
      actionPath: '/results?mode=simple',
      actionLabel: 'View Results & 3D Twin'
    }
  ];

  // Filtered projects
  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = projectTab === 'all' || p.category === projectTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExportPDF = (projectTitle: string, loc: string) => {
    generatePdfReport({
      projectName: projectTitle,
      location: loc,
      shelterType: 'High-Altitude Passive Thermal Shelter',
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
      
      {/* ========================================================================= */}
      {/* Top Banner & UPPER RIGHT CORNER "CREATE NEW" TAB / BUTTON                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B2559] font-display">
              Project Dashboard
            </h1>
            <span className="text-xs font-mono font-bold bg-[#DCEEFF] text-[#0B2559] px-2.5 py-0.5 rounded-full">
              Fullpage Studio
            </span>
          </div>
          <p className="text-sm text-[#64748B] mt-1 font-medium">
            Welcome back! Manage working drafts, inspect completed simulations, or create a new shelter design.
          </p>
        </div>

        {/* Upper Right Action Bar with Prominent "CREATE NEW" Tab */}
        <div className="flex items-center space-x-3">
          {/* Quick Weather Badge */}
          <div className="hidden sm:flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 shadow-xs text-xs">
            <Sun className="w-4 h-4 text-[#F28C28]" />
            <div>
              <span className="font-bold text-[#0B2559]">-8°C</span>
              <span className="text-[#64748B] ml-1">Leh Station</span>
            </div>
          </div>

          {/* Upper Right Corner CREATE NEW Tab / Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-white text-xs font-extrabold transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            title="Create New Passive Shelter Project"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create New Project</span>
          </button>
        </div>
      </div>

      {/* Hero Mode Choice Cards (Simple Mode vs Expert Mode) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Simple Mode Card */}
        <div className="group relative bg-white border-2 border-[#2E7D4F]/20 hover:border-[#2E7D4F] rounded-2xl p-6 lg:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDF3E4] rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#DDF3E4] border border-[#2E7D4F]/20 flex items-center justify-center text-[#2E7D4F]">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DDF3E4] text-[#2E7D4F] font-mono">
                Homeowners & Planners
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#0B2559] font-display mb-1.5">
              SIMPLE MODE
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Get quick recommendations with minimal inputs. Automatic cold-climate engineering presets and instant 3D preview.
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#172033] mb-5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D4F]"></span>
                <span className="text-[11px]">4-Step Guided Flow</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D4F]"></span>
                <span className="text-[11px]">Live Comfort Score</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D4F]"></span>
                <span className="text-[11px]">Auto Physics R-Values</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D4F]"></span>
                <span className="text-[11px]">Instant PDF Report</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/simple')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <span>Start Simple Mode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Expert Mode Card */}
        <div className="group relative bg-gradient-to-br from-white via-[#FAF7FD] to-[#F1EAFA] border-2 border-[#6546A5]/25 hover:border-[#6546A5] rounded-2xl p-6 lg:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#E9DDF8] via-[#DDD0F5] to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#EDE7F6] border border-[#6546A5]/20 flex items-center justify-center text-[#6546A5] shadow-xs">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EDE7F6] text-[#6546A5] font-mono border border-[#6546A5]/20">
                Engineers & Researchers
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#0B2559] font-display mb-1.5">
              EXPERT MODE
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Full control for professionals. Configure multi-layer envelopes, solar azimuth, PCM thermal mass, and genetic Pareto optimization.
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#172033] mb-5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6546A5]"></span>
                <span className="text-[11px]">Layered U-Value CAD</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6546A5]"></span>
                <span className="text-[11px]">24h Dynamic RC Solver</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6546A5]"></span>
                <span className="text-[11px]">Genetic Pareto Frontier</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6546A5]"></span>
                <span className="text-[11px]">3D Digital Twin Visualizer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/expert/project')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl bg-[#6546A5] hover:bg-[#523887] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <span>Start Expert Mode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN PROJECTS SECTION: WORKING & COMPLETED TABS                           */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        
        {/* Projects Section Header & Filtering Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-bold text-[#0B2559] font-display">
              Projects Lifecycle
            </h3>
            
            {/* Category Tabs: All / Working / Completed */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-[#E2E8F0]">
              <button
                onClick={() => setProjectTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  projectTab === 'all' ? 'bg-white text-[#0B2559] shadow-xs' : 'text-[#64748B] hover:text-[#0B2559]'
                }`}
              >
                All ({allProjects.length})
              </button>
              <button
                onClick={() => setProjectTab('working')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  projectTab === 'working' ? 'bg-[#2563A9] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0B2559]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Working ({allProjects.filter(p => p.category === 'working').length})</span>
              </button>
              <button
                onClick={() => setProjectTab('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  projectTab === 'completed' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0B2559]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed ({allProjects.filter(p => p.category === 'completed').length})</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs bg-white focus:outline-none focus:border-[#2563A9]"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => {
            const isWorking = proj.category === 'working';
            return (
              <div
                key={proj.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#2563A9]/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${proj.modeBadge}`}>
                        {proj.mode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                        isWorking ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isWorking ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                        <span>{isWorking ? 'In-Progress Draft' : 'Simulation Complete'}</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{proj.modified}</span>
                  </div>

                  {/* Thumbnail & Title Info */}
                  <div className="flex space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#0B2559]/20"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#0B2559] leading-tight">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#64748B] flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 text-[#2563A9] mr-1" />
                        {proj.location}
                      </p>
                      <p className="text-[11px] text-[#64748B] mt-1 font-mono">{proj.specs}</p>
                    </div>
                  </div>

                  {/* Dynamic Metrics or Progress Bar */}
                  {isWorking ? (
                    /* Working Project: Progress Bar & Current Stage */
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#64748B] text-[11px] font-semibold">Design Pipeline Progress:</span>
                        <span className="font-bold font-mono text-[#2563A9]">{proj.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#2563A9] to-[#2E7D4F] rounded-full transition-all duration-500"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#64748B] font-mono truncate">
                        Active Step: <strong className="text-[#0B2559]">{proj.currentStage}</strong>
                      </p>
                    </div>
                  ) : (
                    /* Completed Project: KPI Summary Badges */
                    <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2.5 text-center text-xs mb-4">
                      <div>
                        <p className="text-[9px] text-[#64748B] uppercase font-mono">Comfort Score</p>
                        <p className="font-extrabold text-sm text-[#2E7D4F] font-mono">{proj.comfortScore}/100</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#64748B] uppercase font-mono">Heating Need</p>
                        <p className="font-extrabold text-sm text-[#F28C28] font-mono">{proj.heatingNeed?.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#64748B] uppercase font-mono">Est. Budget</p>
                        <p className="font-extrabold text-sm text-[#0B2559] font-mono">{proj.cost?.split(' ')[1]}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  {isWorking ? (
                    <button
                      onClick={() => navigate(proj.actionPath)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#0B2559] hover:bg-[#2563A9] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{proj.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 w-full">
                      <button
                        onClick={() => navigate(proj.actionPath)}
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-[#0B2559] hover:bg-[#2563A9] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Diagnostics</span>
                      </button>

                      <button
                        onClick={() => navigate('/3d-twin')}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2559] transition-colors cursor-pointer"
                        title="3D Digital Twin"
                      >
                        <Box className="w-4 h-4 text-[#2563A9]" />
                      </button>

                      <button
                        onClick={() => handleExportPDF(proj.title, proj.location)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2559] transition-colors cursor-pointer"
                        title="Download Engineering Report PDF"
                      >
                        <Download className="w-4 h-4 text-[#2E7D4F]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Value Badges Strip (matching wireframe) */}
      <div className="pt-6 border-t border-[#E2E8F0]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#F28C28]/10 text-[#F28C28]">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Area-Specific</p>
              <p className="text-[9px] text-[#64748B]">Micro-climate tuned</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#2563A9]/10 text-[#2563A9]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Thermal Comfort</p>
              <p className="text-[9px] text-[#64748B]">Extreme cold resilient</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#2E7D4F]/10 text-[#2E7D4F]">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Sustainable</p>
              <p className="text-[9px] text-[#64748B]">Zero carbon footprint</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#F28C28]/10 text-[#F28C28]">
              <CircleDollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Cost-Optimized</p>
              <p className="text-[9px] text-[#64748B]">Maximum ROI</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#6546A5]/10 text-[#6546A5]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Data-Driven</p>
              <p className="text-[9px] text-[#64748B]">Physics RC validation</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#0B2559]/10 text-[#0B2559]">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0B2559]">Ladakh Ready</p>
              <p className="text-[9px] text-[#64748B]">High-altitude tested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Project */}
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};
