import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, PlusCircle, ArrowRight, MapPin } from 'lucide-react';

export const ProjectsListPage: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'proj-1',
      title: 'Mountain Shelter – Leh',
      location: 'Leh, Ladakh (3,500m)',
      mode: 'Simple Mode',
      status: 'Simulation Completed',
      comfortScore: 92,
      heatingNeed: '18 kWh/m²/yr',
      cost: '₹ 6.35 Lakh',
      modified: '2 hours ago',
      path: '/results?mode=simple',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'proj-2',
      title: 'Off-grid Cabin – Kargil',
      location: 'Kargil, Ladakh (2,676m)',
      mode: 'Expert Mode',
      status: 'Optimization Ready',
      comfortScore: 94,
      heatingNeed: '14.5 kWh/m²/yr',
      cost: '₹ 7.10 Lakh',
      modified: '1 day ago',
      path: '/results?mode=expert',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'proj-3',
      title: 'Research Shelter – Nubra',
      location: 'Diskit, Nubra (3,048m)',
      mode: 'Expert Mode',
      status: 'CAD Validated',
      comfortScore: 88,
      heatingNeed: '21 kWh/m²/yr',
      cost: '₹ 8.50 Lakh',
      modified: '3 days ago',
      path: '/results?mode=expert',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'proj-4',
      title: 'High Altitude Eco-Pod – Nyoma',
      location: 'Nyoma, Changthang (4,180m)',
      mode: 'Simple Mode',
      status: 'Draft Setup',
      comfortScore: 90,
      heatingNeed: '22 kWh/m²/yr',
      cost: '₹ 5.90 Lakh',
      modified: '5 days ago',
      path: '/results?mode=simple',
      img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0B2559] font-display flex items-center">
            <FolderKanban className="w-5 h-5 mr-2 text-[#2563A9]" />
            My Projects
          </h1>
          <p className="text-xs text-[#64748B]">Manage, simulate, and export passive shelter engineering designs</p>
        </div>

        <button
          onClick={() => navigate('/simple')}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#2E7D4F] hover:bg-[#256640] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(p.path)}
            className="group bg-white border border-[#E2E8F0] hover:border-[#2563A9]/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  p.mode === 'Simple Mode' ? 'bg-[#DDF3E4] text-[#2E7D4F]' : 'bg-[#6546A5]/10 text-[#6546A5]'
                }`}>
                  {p.mode}
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">{p.modified}</span>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-[#0B2559]/15"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0B2559] group-hover:text-[#2563A9] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#64748B] flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 text-[#2563A9] mr-1" />
                    {p.location}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">{p.status}</p>
                </div>
              </div>

              {/* Metrics bar */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center text-xs">
                <div>
                  <p className="text-[9px] text-[#64748B] font-mono">Comfort</p>
                  <p className="font-bold text-[#2E7D4F] font-mono">{p.comfortScore}/100</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#64748B] font-mono">Heating</p>
                  <p className="font-bold text-[#F28C28] font-mono">{p.heatingNeed.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#64748B] font-mono">Budget</p>
                  <p className="font-bold text-[#0B2559] font-mono">{p.cost.split(' ')[1]}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex justify-between items-center text-xs font-bold text-[#2563A9]">
              <span>Open Diagnostics & 3D</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
